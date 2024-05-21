const express = require("express");

const {sendOTPToUser} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/generate-login-otp',sendOTPToUser);


module.exports = router;