const qrServices = require('../services/QRCode/qrcode');

exports.readQR = async (req,res,next)=>{
    try {

        req.body.id = req.query.id;
        const response = await qrServices.readQR(req.body);
        res.redirect(response.link);
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}