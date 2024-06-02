const express = require("express");

const {sendOTPToUser, validateUserRequest} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/generate-login-otp',sendOTPToUser);
router.get('/validate-join-request',validateUserRequest);


module.exports = router;