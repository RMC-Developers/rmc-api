const ObjectId = require("mongoose").Types.ObjectId;

const User = require('../../models/User');

const { JWT_SECRET_KEY } = require('../../configurations/constants');
const { GenerateOTP,createRequestAcceptOrDeclineContent } = require('../../utils/common');
const { sentMail,notifiyingAdminAboutTheNewRequest } = require('../../utils/mail')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signin = async ({ email, password }) => {
    try {

        const userFromDb = await User.findOne({ email: email }, { email: 1, password: 1, name: 1 });


        if (!userFromDb) return { statusCode: 409, message: "No user found" };

        const passwordCheck = await bcrypt.compare(
            password,
            userFromDb.password
        );

        if (!passwordCheck) {
            return { message: "Wrong password", statusCode: 409 };
        }
        const token = jwt.sign(
            {
                email: userFromDb.email,
                userId: userFromDb._id.toString(),
            },
            JWT_SECRET_KEY,
            { expiresIn: "168h" }
        );
        return { statusCode: 200, user: { name: userFromDb.name, email: userFromDb.email, _id: userFromDb._id }, token: token }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.signinWithOTP = async ({ email, otp }) => {
    try {

        const userFromDb = await User.findOne({ email: email }, { email: 1, otp: 1, name: 1 });


        if (!userFromDb) return { statusCode: 409, message: "No user found" };



        if (userFromDb.otp != otp) {
            return { message: "Invalid OTP", statusCode: 409 };
        }

        await User.updateOne({ email: email }, { $set: { otp: null } });

        const token = jwt.sign(
            {
                email: userFromDb.email,
                userId: userFromDb._id.toString(),
            },
            JWT_SECRET_KEY,
            { expiresIn: "168h" }
        );
        return { statusCode: 200, user: { name: userFromDb.name, email: userFromDb.email, _id: userFromDb._id }, token: token }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.sendOTPToUser = async ({ email }) => {
    try {

        const userFromDb = await User.findOne({ email: email }, { email: 1, name: 1, adminVerified:1 });

        if (!userFromDb) return { statusCode: 409, message: "Please register first !!" }

        if(userFromDb.adminVerified != true) return { statusCode: 409, message: "Please contact admin for verificaton" }

        const OTP = GenerateOTP();

        let userOTP = await User.updateOne({ email: email }, { $set: { otp: OTP } });
        console.log(userOTP)

        let emailContent = `Hi ${userFromDb.name}. Your OTP for RMC login is ${OTP}`;

        await sentMail(userFromDb.email, 'RMC OTP', emailContent);

        return { statusCode: 200, message: "Please check you mail box for RMC login OTP" }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.signup = async ({ name, email, password }) => {
    try {

        const userFromDb = await User.findOne({ email: email });

        if (userFromDb)
            return { statusCode: 409, message: "User already exists" }

        const hashedPassword = await bcrypt.hash(password, 12);


        const userObj = User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await userObj.save();
        return { statusCode: 200, message: "User Created" };


    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.signupThroughForm = async ({ name, email }) => {
    try {

        const userFromDb = await User.findOne({ email: email });

        if (userFromDb)
            return { statusCode: 409, message: "User already exists" }

        const hashedPassword = await bcrypt.hash("123", 12);


        const userObj = User({
            name: name,
            email: email,
            password: hashedPassword
        })

        let res = await userObj.save();

        let mailContent = createRequestAcceptOrDeclineContent(res.name,res._id);

        
        console.log(mailContent);
        await notifiyingAdminAboutTheNewRequest(mailContent);

        
        return { statusCode: 200, message: "User Created" };


    } catch (error) {
        console.log(error);
        throw error;
    }
}




exports.userVerification = async ({ userId }) => {
    try {

        const userFromDb = await User.findById(new ObjectId(userId));
        if (!userFromDb) return { statusCode: 409, message: `User not found` }

        return { statusCode: 200 }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUser = async ({ userId }) => {
    try {

        const userFromDb = await User.findById(new ObjectId(userId), { password: 0 });
        if (!userFromDb) return { statusCode: 409, message: `User not found` }

        return { statusCode: 200, user: userFromDb }


        return { statusCode: 200 }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fillProfileData = async ({ userId, name, membershipId, personalDetails, vehicleDetails }) => {
    try {

        let res = await User.updateOne({ _id: new ObjectId(userId) }, {
            $set: {

                name: name || null,
                membershipId: membershipId || null,
                "personalDetails.phone": personalDetails?.phone ?? null,
                "personalDetails.dob": personalDetails?.dob ?? null,
                "personalDetails.whatsappNumber": personalDetails?.whatsappNumber ?? null,
                "personalDetails.bloodGroup": personalDetails?.bloodGroup ?? null,
                "personalDetails.willingToDonate": personalDetails?.willingToDonate ?? null,

                "vehicleDetails.registrationNumber": vehicleDetails?.registrationNumber  ?? null,
                "vehicleDetails.colour": vehicleDetails?.colour ?? null,
                "vehicleDetails.registeredYear": vehicleDetails?.registeredYear ?? null,
                "vehicleDetails.variant": vehicleDetails?.variant ?? null,
                "vehicleDetails.chasisNumber": vehicleDetails?.chasisNumber ?? null,
                "vehicleDetails.engineNumber": vehicleDetails?.engineNumber ?? null,
                "vehicleDetails.insuranceUpTo": vehicleDetails?.insuranceUpTo ?? null,
                "vehicleDetails.pucUpto": vehicleDetails?.pucUpto ?? null,
                "vehicleDetails.fitnessUpto": vehicleDetails?.fitnessUpto ?? null,
                "vehicleDetails.taxUpto": vehicleDetails?.taxUpto ?? null,

            }
        })

        return { statusCode: 200, message: "Data updated successfully" }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUserProfileData = async({userId})=>{
    try {

        const userFromDb = await User.findById(userId,{password:0,otp:0,__v:0});
        if(! userFromDb) return {statusCode:409,message:`User not found`}
        return {statusCode:200,profileData:userFromDb}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.validateUserRequest = async({userId,state})=>{
    try {

        let res = await User.updateOne({_id: new ObjectId(userId)},{$set:{adminVerified: state}});
        console.log(res)
        return;


        
    } catch (error) {
        console.log(error);
        throw error;
    }
}