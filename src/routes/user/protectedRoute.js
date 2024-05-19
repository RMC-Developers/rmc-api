const express = require("express");

const {createFuelEntry,getFuelEfficiencyReport,createServiceEntry} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/create-fuel-entry',createFuelEntry);
router.post('/create-service-entry',createServiceEntry);
router.get('/get-fuel-efficiency-report',getFuelEfficiencyReport)


module.exports = router;