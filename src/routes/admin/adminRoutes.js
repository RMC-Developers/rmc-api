const express = require("express");

const adminController = require('../../controllers/admin/adminController')

const router = express.Router();

router.post('/create-service-category',adminController.createServiceCategory);

router.post('/assign-membershipid',adminController.assingAMembershipIdToAUser)

router.post('/create-qr',adminController.createQRCode);

router.get('/list-members',adminController.listUsers);

router.get('/list-qrs',adminController.listQR);

router.get('/view-a-qr',adminController.viewAQR);

router.get('/view-a-member',adminController.viewAUser);

router.post('/toggle-to-landingpage-state',adminController.toggleToLandingPageState);

router.post('/connect-membershipId-with-qr',adminController.assingMembershipIdToAQr);

router.post('/connect-existing-membershipId-with-qr', adminController.assingMembershipIdToAQrWithAlreadyExistedMembershipId);

module.exports = router;