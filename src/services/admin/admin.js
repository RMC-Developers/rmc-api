const ServiceCategory = require('../../models/ServiceCategory')

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