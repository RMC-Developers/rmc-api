const express = require("express");

const {createFuelEntry,createServiceEntry,getServiceCategories,getServiceLog,getFuelLog,
    getFuelEfficiencyReportOG,getUser,fillUserProfile,getUserProfileData,getServiceReport} = require('../../controllers/user/userController')

const router = express.Router();

router.get('/get-user-with-token',getUser)

router.post('/fill-user-profile',fillUserProfile);
router.get('/get-user-profile',getUserProfileData)

router.get('/get-service-categories',getServiceCategories);

router.post('/create-fuel-entry',createFuelEntry);
router.post('/create-service-entry',createServiceEntry);

router.get('/get-fuel-efficiency-report',getFuelEfficiencyReportOG);
router.get('/get-service-report',getServiceReport);

router.get('/get-service-log',getServiceLog);
router.get('/get-fuel-log',getFuelLog);


module.exports = router;