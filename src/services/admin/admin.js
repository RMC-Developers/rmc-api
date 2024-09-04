const ObjectId = require("mongoose").Types.ObjectId;

const ServiceCategory = require('../../models/ServiceCategory');
const User = require('../../models/User');
const QR = require('../../models/QR');

const { SERVER_DOMAIN } = require('../../configurations/constants')

const qrHelpers = require('../../helpers/qrCode');

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

exports.listAllQRs = async ({}) => {
    try {

        const qrsFromDb = await QR.find({});
        if(qrsFromDb.length == 0) return {statusCode:409, message:"No data found"}

        return {statusCode:200, qrList:qrsFromDb}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.viewAParticularQR = async({id})=>{
    try {

        const qrFromDb = await QR.findById(id);
        if(!qrFromDb) return {statusCode:409, message:"No qr found in Database"}

        return {statusCode:200, qrCode:qrFromDb}
    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.assingMembershipIdToAQr = async({qrId,membershipId})=>{
    try {

        const qrDataFromDb = await QR.find({membershipId:membershipId,deleted:false});
        if(qrDataFromDb) return {statusCode:200, alreadyExist:true, message:"RMC ID already connected with a QR"}
        const res = await QR.updateOne({_id:new ObjectId(qrId)},{$set:{membershipId:membershipId}});

        return {statusCode:200,message:"Updated.",alreadyExist:null}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.assingMembershipIdToAQrWithAlreadyExistedMembershipId = async({qrId,membershipId})=>{
    try {

        const res = await QR.updateOne({_id:new ObjectId(qrId)},{$set:{membershipId:membershipId}});

        return {statusCode:200,message:"Updated."}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.toggleToLandingPageState = async({qrId,state})=>{
    try {

        const res = await QR.updateOne({_id:new ObjectId(qrId)},{$set:{toLandingPage:state}});

        return {statusCode:200,message:"Updated."}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}