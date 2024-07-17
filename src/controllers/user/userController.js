
const {signup,signin,getUser,sendOTPToUser,signinWithOTP,fillProfileData,getUserProfileData,signupThroughForm,validateUserRequest} = require('../../services/auth/user');
const {addServiceEntry,addFuelEntry,efficiencyCalculator,getServiceCategories,getServiceRateSplitUp,
  getServiceLog,getFuelLog,fuelReport, fuelEfficiencyReport,getServiceConsumptionReport} = require('../../services/general/general');

exports.signin = async (req, res, next) => {
    try {
      const response = await signin(req.body);
      res.status(response.statusCode).send({message:response.message,user:response.user,token:response.token});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.signup = async (req, res, next) => {
    try {
      const response = await signup(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.formSignup = async (req, res, next) => {
    try {
      const response = await signupThroughForm(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };


  exports.signinWithOTP = async (req, res, next) => {
    try {
      const response = await signinWithOTP(req.body);
      res.status(response.statusCode).send({message:response.message,user:response.user,token:response.token});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };


  exports.sendOTPToUser = async (req, res, next) => {
    try {
      const response = await sendOTPToUser(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.fillUserProfile=async (req, res, next) => {
    try {
      const response = await fillProfileData(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getUserProfileData = async (req, res, next) => {
    try {
      const response = await getUserProfileData(req.body);
      res.status(response.statusCode).send({message:response.message,profileData:response.profileData});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getUser = async (req, res, next) => {
    try {
      const response = await getUser(req.body);
      res.status(response.statusCode).send({message:response.message,user:response.user});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.createFuelEntry = async (req, res, next) => {
    try {
      const response = await addFuelEntry(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.createServiceEntry = async (req, res, next) => {
    try {
      const response = await addServiceEntry(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getFuelEfficiencyReportTest = async(req, res, next) => {
    try {
      const response = await efficiencyCalculator(req.body);
      res.status(response.statusCode).send({message:response.message,efficiencyData:response.data,analytics:response.analytics});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getFuelEfficiencyReport = async(req, res, next) => {
    try {
      const response = await fuelEfficiencyReport(req.body);
      res.status(response.statusCode).send({message:response.message,analytics:response.analytics});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.fuelReport = async(req, res, next) => {
    try {
      const response = await fuelReport(req.body);
      res.status(response.statusCode).send({message:response.message,fuelReport:response.consumptionReport});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };


  
  exports.getServiceConsumptionReport = async(req, res, next) => {
    try {
      const response = await getServiceConsumptionReport(req.body);
      res.status(response.statusCode).send({message:response.message,report:response.report});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };
  
  exports.getServiceRateSplitUp = async(req, res, next) => {
    try {
      const response = await getServiceRateSplitUp(req.body);
      res.status(response.statusCode).send({message:response.message,report:response.report});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getServiceCategories =  async(req, res, next) => {
    try {
      const response = await getServiceCategories(req.body);
      res.status(response.statusCode).send({message:response.message,categories:response.categories});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getServiceLog =  async(req, res, next) => {
    try {
      const response = await getServiceLog(req.body);
      res.status(response.statusCode).send({message:response.message,serviceLog:response.serviceLog});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getFuelLog =  async(req, res, next) => {
    try {
      const response = await getFuelLog(req.body);
      res.status(response.statusCode).send({message:response.message,fuelLog:response.fuelLog});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.validateUserRequest = async(req, res, next)=>{

    try {

      req.body.userId = req.query.userId;
      req.body.state = req.query.state;

      let response = await validateUserRequest(req.body);
      res.status(response.message).send({message:response.message})

      
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }

  }