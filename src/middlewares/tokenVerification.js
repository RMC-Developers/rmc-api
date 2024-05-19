const jwt = require('jsonwebtoken')

const {JWT_SECRET_KEY} = require('../configurations/constants')

const {userVerification} = require('../services/auth/user')


exports.isAdmin = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated");
      error.status = 400;
      next(error);
    } else {
      try {
        if(authHeader != "admin@123") {
          const error = new Error("Only for admin");
          error.status = 400;
          next(error);
        } else {
          next();
        }
      } catch (error) {
        error.status = 400;
        next(error);
      }
    }
  };


exports.isUser = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated");

    error.status = 400;
    console.log(error);
    next(error);
  } else {
    //const token = req.get("Authorization").split(".")[1];
    try {
      decodedToken = jwt.verify(authHeader, JWT_SECRET_KEY);
      req.body.userId = decodedToken.userId;
      const response = await userVerification(decodedToken);
      if (response.statusCode != 200) {
        const error = new Error(response.message);
        error.status = 400;
        next(error);
      } else {
        next();
      }
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
};
  