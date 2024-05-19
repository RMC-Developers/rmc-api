const ObjectId = require("mongoose").Types.ObjectId;

const User = require('../../models/User');

const {JWT_SECRET_KEY} = require('../../configurations/constants')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signin = async ({email,password})=>{
    try {

        const userFromDb = await User.findOne({email: email},{email,password});
        if(!userFromDb) return {statusCode:409,message:"No user found"};

        if(userFromDb.password != password) return {statusCode:409,message:"Wrong password"}
            const token =  jwt.sign(
                {
                  email: userFromDb.email,
                  userId: userFromDb._id.toString(),
                },
                JWT_SECRET_KEY,
                { expiresIn: "168h" }
              );
            return {statusCode:200,user:userFromDb,token:token}

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.signup = async ({name,email,password})=>{
    try {

        const userFromDb = await User.findOne({email: email});
        
        if(userFromDb)
        return {statusCode:409,message:"User already exists"}

        const hashedPassword = await bcrypt.hash(password, 12);

         const userObj = User({
            name: name,
            email: email,
            password: hashedPassword 
         })

         await userObj.save();
         return {statusCode:200,message:"User Created"};

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.userVerification = async({userId})=>{
    try {

        const userFromDb = await User.findById(new ObjectId(userId));
        if(!userFromDb) return {statusCode:409,message:`User not found`}

        return {statusCode:200}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}