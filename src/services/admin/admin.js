const ObjectId = require("mongoose").Types.ObjectId;

const ServiceCategory = require('../../models/ServiceCategory');
const User = require('../../models/User');
const QR = require('../../models/QR');

const { SERVER_DOMAIN, RMCID_RANGE, RMCID_PREFIX } = require('../../configurations/constants')

const qrHelpers = require('../../helpers/qrCode');



exports.assignAUserWithMembershipID = async ({ userId }) => {
    try {

        //finding last assigned id

        const userFromDb = await User.findById(userId, { membershipId: 1 });


        if (userFromDb.membershipId) return { statusCode: 409, message: "Conflict, already membership id exist." }

        const lastQRCodeFromDb = await User.find({}).sort({ membershipId: -1 }).limit(1);
        let membershipId;
        if (!lastQRCodeFromDb[0].membershipId) {
            membershipId = RMCID_RANGE;
        } else {

            membershipId = Number(lastQRCodeFromDb[0].membershipId) + 1
        }

        await User.updateOne({ _id: new ObjectId(userId) }, { $set: { membershipId: membershipId } });

        return { statusCode: 200, message: "Membership ID assigned" }



    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createServiceCategory = async ({ categoryName }) => {
    try {

        const trimmedCategoryName = categoryName.trim().toLowerCase();
        const categoryObj = new ServiceCategory({
            name: trimmedCategoryName
        })

        await categoryObj.save();

        return { statusCode: 200, message: "Category saved successfully" }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUserList = async ({ }) => {

    try {

        const userListFromDb = await User.aggregate([
            {
                $project: {
                    name: 1,
                    membershipId: 1,
                    email: 1,
                    membershipId: {
                        $concat: [RMCID_PREFIX, { $toString: "$membershipId" }]
                    },
                    whatsapp: {
                        $concat: [{ $toString: "$personalDetails.whatsappNumberCountrCode" }, "", { $toString: "$personalDetails.whatsappNumber" }]
                    },
                    phone: {
                        $concat: [{ $toString: "$personalDetails.phoneCountryCode" }, { $toString: "$personalDetails.phone" }]
                    },
                    address: {
                        $concat: ["$personalDetails.address", "$personalDetails.postOffice", { $toString: "$personalDetails.pincode" }, "", ",", "$personalDetails.district", "$personalDetails.state"]
                    },
                    adminVerified: 1
                }
            }
        ])

        if (userListFromDb.length == 0) return { statusCode: 409, message: "Empty List" }
        return { statusCode: 200, users: userListFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }

}

exports.createQRCode = async ({ }) => {

    try {

        const qrObj = new QR({});
        let res = await qrObj.save();

        let qrCodeURL = await qrHelpers.createQrCodeToAURL(`${SERVER_DOMAIN}/v1/qr/scan?id=${res._id}`);

        let update = await QR.updateOne({ _id: new ObjectId(res._id) }, {
            $set: {
                qrCode: qrCodeURL
            }
        })

        return { statusCode: 200, message: "QR Code created success" }

    } catch (error) {
        console.log(error);
        throw error;
    }

}

exports.listAllQRs = async ({ }) => {
    try {

        //const qrsFromDb = await QR.find({});

        const qrsFromDb = await QR.aggregate([
            {
                $addFields: {
                    membershipIdNumber: { $toInt: "$membershipId" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "membershipIdNumber",
                    foreignField: "membershipId",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true // Include QR records even if no matching user
                }
            },
            {
                $project: {
                    _id: 1,
                    id: 1,
                    membershipId: 1,
                    qrCode: 1,
                    toLandingPage: 1,
                    deleted: 1,
                    "user.name": 1
                }
            }
        ]);



        if (qrsFromDb.length == 0) return { statusCode: 409, message: "No data found" }

        return { statusCode: 200, qrList: qrsFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.viewAParticularQR = async ({ id }) => {
    try {

        const qrFromDb = await QR.findById(id);
        if (!qrFromDb) return { statusCode: 409, message: "No qr found in Database" }

        return { statusCode: 200, qrCode: qrFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.viewAParticularUser = async ({ userId }) => {
    try {

        const userFromDb = await User.aggregate([
            {
                $match: {
                    _id: new ObjectId(userId)
                }
            },
            {
                $addFields: {
                    membershipIdString: { $toString: "$membershipId" }
                }
            },
            {
                $lookup: {
                    from: 'qrs',
                    localField: 'membershipIdString',
                    foreignField: 'membershipId',
                    as: 'qr'
                }

            },
            {
                $unwind: {
                    path: '$qr',
                    preserveNullAndEmptyArrays: true // Include QR records even if no matching user

                }
            },
            {
                $project: {
                    name: 1,
                    adminVerified: 1,
                    membershipId: 1,
                    email: 1,
                    "qr._id": 1,
                    "qr.qrCode": 1,
                    registrationNumber: {
                        $concat: ["$vehicleDetails.registrationNumber", ""]
                    },
                    vechileVariant: {
                        $concat: ["$vehicleDetails.variant", ""]
                    },
                    whatsapp: {
                        $concat: [{ $toString: "$personalDetails.whatsappNumberCountrCode" }, "", { $toString: "$personalDetails.whatsappNumber" }]
                    },
                    phone: {
                        $concat: [{ $toString: "$personalDetails.phoneCountryCode" }, { $toString: "$personalDetails.phone" }]
                    },
                    address: {
                        $concat: ["$personalDetails.address", " ", "$personalDetails.postOffice", " ", { $toString: "$personalDetails.pincode" }, "", ",", "$personalDetails.district", " ", "$personalDetails.state"]
                    },
                }
            }
        ])
        if (userFromDb.length == 0) return { statusCode: 409, message: "No data found." }
        return { statusCode: 200, user: userFromDb[0] }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.assingMembershipIdToAQr = async ({ qrId, membershipId }) => {
    try {

        const qrDataFromDb = await QR.findOne({ membershipId: membershipId, deleted: false });
        console.log(qrDataFromDb)
        if (qrDataFromDb) return { statusCode: 200, alreadyExist: true, message: "RMC ID already connected with a QR" }
        const res = await QR.updateOne({ _id: new ObjectId(qrId) }, { $set: { membershipId: membershipId } });

        return { statusCode: 200, message: "Updated.", alreadyExist: false }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.assingMembershipIdToAQrWithAlreadyExistedMembershipId = async ({ qrId, membershipId }) => {
    try {

        const res = await QR.updateOne({ _id: new ObjectId(qrId) }, { $set: { membershipId: membershipId } });
        await QR.updateOne({ membershipId: membershipId }, { $set: { deleted: true } })
        return { statusCode: 200, message: "Updated." }

    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.toggleToLandingPageState = async ({ qrId, state }) => {
    try {

        const res = await QR.updateOne({ _id: new ObjectId(qrId) }, { $set: { toLandingPage: state } });

        return { statusCode: 200, message: "Updated." }

    } catch (error) {
        console.log(error);
        throw error;
    }
}