const ServiceCategory = require('../../models/ServiceCategory');
const User = require('../../models/User')

exports.createServiceCategory = async ({categoryName})=>{
    try {

        const trimmedCategoryName = categoryName.trim().toLowerCase();
        const categoryObj = new ServiceCategory({
            name: trimmedCategoryName
        })
        
        await  categoryObj.save();

        return {statusCode:200,message:"Category saved successfully"}


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getUserList = async ({})=>{

    try {

        const userListFromDb = await User.aggregate([
            {
                $project:{
                    name:1,
                    membershipId:1,
                    email:1,
                    whatsapp:{
                        $concat:[{$toString:"$personalDetails.whatsappNumberCountrCode"},"",{$toString:"$personalDetails.whatsappNumber"}]
                    },
                    phone:{
                        $concat:[{$toString:"$personalDetails.phoneCountryCode"},{$toString:"$personalDetails.phone"}]
                    },
                    address:{
                        $concat:["$personalDetails.address","$personalDetails.postOffice", {$toString:"$personalDetails.pincode"},"",",", "$personalDetails.district", "$personalDetails.state"]
                    },
                    adminVerified:1
                }
            }
        ])

        if(userListFromDb.length == 0) return {statusCode:409,message:"Empty List"}
        return {statusCode:200,users:userListFromDb}
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}