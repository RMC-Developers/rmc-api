const routes = require("express").Router();

const userAuthRoute = require('./auth');
const protectedRoute = require('./protectedRoute');

const userTokenVerification = require('../../middlewares/tokenVerification')


routes.use("/auth",userAuthRoute );
routes.use("/",userTokenVerification.isUser,protectedRoute);


module.exports = routes;

