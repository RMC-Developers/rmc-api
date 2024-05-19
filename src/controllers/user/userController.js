
const {signup,signin} = require('../../services/auth/user');
const {addServiceEntry,addFuelEntry,efficiencyCalculator} = require('../../services/general/general');

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


  exports.getFuelEfficiencyReport = async(req, res, next) => {
    try {
      const response = await efficiencyCalculator(req.body);
      res.status(response.statusCode).send({message:response.message,efficiencyData:response.data,analytics:response.analytics});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };