const QR = require('../../models/QR')

exports.readQR = async ({id})=>{
    try {

        const qrFromDb = await QR.findById(id);

        //if no membership id and landing page false what to do

        if(!qrFromDb) return {toLandingPage:true, link:'https://ritzmotoclub.com/'}
        if(qrFromDb.toLandingPage) return {toLandingPage:true, link:'https://ritzmotoclub.com/'}
        if(qrFromDb.membershipId == null && qrFromDb.toLandingPage) return {toLandingPage:true, link:'https://ritzmotoclub.com/'}
        if(qrFromDb != null) return {toLandingPage:false,link:'https://manager.wazeefa.in/index.php/dashboard'}
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}