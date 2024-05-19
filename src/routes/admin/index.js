const routes = require("express").Router();

const adminRoute = require('./adminRoutes');


routes.use("/", adminRoute);



module.exports = routes;

