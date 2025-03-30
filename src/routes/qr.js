const express = require("express");

const {readQR,readRMCQR} = require('../controllers/generalContoller')

const router = express.Router();

router.get('/scan',readQR);
router.get('/scan_rmc',readRMCQR);



module.exports = router;