const routes = require('express').Router();

const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');

const tokenVerification = require('../middlewares/tokenVerification')

routes.use('/admin/',tokenVerification.isAdmin,adminRoutes);
routes.use('/user/',userRoutes)

module.exports = routes;