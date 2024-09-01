const routes = require('express').Router();

const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');
const qrRoutes = require('./qr')

const tokenVerification = require('../middlewares/tokenVerification')

routes.use('/admin/',tokenVerification.isAdmin,adminRoutes);
routes.use('/user/',userRoutes);
routes.use('/qr/',qrRoutes)

module.exports = routes;