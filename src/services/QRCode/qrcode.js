const constants = require('../../configurations/constants');
const QR = require('../../models/QR')
const RMCQR = require('../../models/RMCQR')

exports.readQR = async ({id})=>{
    try {

        const qrFromDb = await QR.findById(id);

        //if no membership id and landing page false what to do

        if(!qrFromDb) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        if(qrFromDb.deleted) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        if(qrFromDb.toLandingPage) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        if(qrFromDb.membershipId == null && qrFromDb.toLandingPage) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        if(qrFromDb != null) return {toLandingPage:false,link:'https://manager.wazeefa.in/index.php/dashboard'}
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.readRMCQR = async ({id})=>{
    try {

        const qrFromDb = await RMCQR.findById(id);

        //if no membership id and landing page false what to do

        if(!qrFromDb) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        if(qrFromDb.deleted) return {toLandingPage:true, link:constants.RMC_QR_LINK}
        return { link:constants.RMC_QR_LINK }
       
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}