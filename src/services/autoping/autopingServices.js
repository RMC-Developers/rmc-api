const User = require('../../models/User');

const {sentMail} = require('../../utils/mail')

exports.getUserDetails = async({id})=>{
    try {
       
        const userFromDb = await User.findById(id,{name:1});
        if(!userFromDb) return {statusCode:409,message:'User Not found'}
        return {
            statusCode:200,
            user:userFromDb
        }

    } catch (error) {
        throw error
    }
}

exports.notifyUser = async({id,message})=>{
    try {
        
        const userFromDb = await User.findById(id,{email:1});
        
        if(userFromDb){
            let title = 'Someone noticed your car !!';
            let content = `Testing Auto ping. message:${message}`    
            await sentMail({toAddress:userFromDb.email,subject:title,content:content})
            return
        }
        return

    } catch (error) {
        throw error
    }
}