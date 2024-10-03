const {createServiceCategory, getUserList, createQRCode, listAllQRs, viewAParticularQR,
   assingMembershipIdToAQr, toggleToLandingPageState,assignAUserWithMembershipID,
    assingMembershipIdToAQrWithAlreadyExistedMembershipId} = require('../../services/admin/admin')


exports.createServiceCategory = async (req, res, next) => {
    try {
      const response = await createServiceCategory(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.createQRCode = async (req, res, next) => {
    try {
      const response = await createQRCode(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.listQR = async (req, res, next) => {
    try {
      const response = await listAllQRs(req.body);
      res.status(response.statusCode).send({message:response.message, qrList:response.qrList});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    } 
  };

  exports.listUsers = async (req, res, next) => {
    try {
      const response = await getUserList(req.body);
      res.status(response.statusCode).send({message:response.message, users:response.users});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.viewAQR = async (req, res, next) => {
    try {
      req.body.id = req.query.id;
      const response = await viewAParticularQR(req.body);
      res.status(response.statusCode).send({message:response.message, qr:response.qrCode});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.assingMembershipIdToAQr = async (req, res, next) => {
    try {
      req.body.id = req.query.id;
      const response = await assingMembershipIdToAQr(req.body);
      res.status(response.statusCode).send({message:response.message, alreadyExist:response.alreadyExist});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.toggleToLandingPageState = async (req, res, next) => {
    try {
      req.body.id = req.query.id;
      const response = await toggleToLandingPageState(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };


  exports.assingMembershipIdToAQrWithAlreadyExistedMembershipId = async (req, res, next) => {
    try {
      req.body.id = req.query.id;
      const response = await assingMembershipIdToAQrWithAlreadyExistedMembershipId(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };


  exports.assingAMembershipIdToAUser = async(req,res,next)=>{
    try {

      const response = await assignAUserWithMembershipID(req.body);
      res.status(response.statusCode).send({message:response.message})


      
    } catch (error) {
      const err = new Error(error.message);
      next(err)
    }
  }
  