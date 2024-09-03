const express = require("express");

const adminController = require('../../controllers/admin/adminController')

const router = express.Router();

router.post('/create-service-category',adminController.createServiceCategory);

router.post('/create-qr',adminController.createQRCode);

router.get('/list-members',adminController.listUsers);

router.get('/list-qrs',adminController.listQR);

router.get('/view-a-qr',adminController.viewAQR);

router.get('/toggle-to-landingpage-state',adminController.toggleToLandingPageState);

router.get('/connect-membershipId-with-qr',adminController.assingMembershipIdToAQr);

module.exports = router;