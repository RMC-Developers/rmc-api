const express = require("express");

const {createFuelEntry,getFuelEfficiencyReport,createServiceEntry,getServiceCategories,getServiceLog,getFuelLog,fuelReport} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/create-fuel-entry',createFuelEntry);
router.post('/create-service-entry',createServiceEntry);
router.get('/get-fuel-efficiency-report',getFuelEfficiencyReport);
router.get('/get-fuel-report',fuelReport);
router.get('/get-service-categories',getServiceCategories);
router.get('/get-service-log',getServiceLog);
router.get('/get-fuel-log',getFuelLog);


module.exports = router;