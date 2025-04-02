const routes = require('express').Router();

const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');
const qrRoutes = require('./qr');
const autopingRoutes = require('./autoping/autoping');


const tokenVerification = require('../middlewares/tokenVerification')

routes.use('/admin/',tokenVerification.isAdmin,adminRoutes);
routes.use('/user/',userRoutes);
routes.use('/qr/',qrRoutes);
routes.use('/autoping/',autopingRoutes);

module.exports = routes;