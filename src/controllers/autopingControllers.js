const autopingServices = require('../services/autoping/autopingServices');

exports.getUserDetails = async (req,res,next)=>{
    try {

        req.body.id = req.query.id;
        const response = await autopingServices.getUserDetails(req.body);
        res.status(response.statusCode).send({user:response.user,message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.notifyUser = async (req,res,next)=>{
    try {

      
        const response = await autopingServices.notifyUser(req.body);
        res.status(200).send()
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

