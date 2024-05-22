const express = require("express");

const {createFuelEntry,getFuelEfficiencyReport,createServiceEntry,getServiceCategories,getServiceLog,getFuelLog,fuelReport,getServiceRateSplitUp,
    getFuelEfficiencyReportTest,getUser,fillUserProfile,getUserProfileData,getServiceConsumptionReport} = require('../../controllers/user/userController')

const router = express.Router();

router.get('/get-user-with-token',getUser)

router.post('/fill-user-profile',fillUserProfile);
router.get('/get-user-profile',getUserProfileData)

router.get('/get-service-categories',getServiceCategories);

router.post('/create-fuel-entry',createFuelEntry);
router.post('/create-service-entry',createServiceEntry);

router.get('/get-fuel-efficiency-report-test',getFuelEfficiencyReportTest);

router.get('/get-fuel-efficiency-report',getFuelEfficiencyReport);
router.get('/get-fuel-report',fuelReport);

router.get('/get-service-consumption-report',getServiceConsumptionReport);
router.get('/get-service-splitup',getServiceRateSplitUp);


router.get('/get-service-log',getServiceLog);
router.get('/get-fuel-log',getFuelLog);


module.exports = router;