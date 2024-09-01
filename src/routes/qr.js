const express = require("express");

const {readQR} = require('../controllers/generalContoller')

const router = express.Router();

router.get('/scan',readQR);



module.exports = router;