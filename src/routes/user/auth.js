const express = require("express");

const {signin,signup,signinWithOTP,formSignup} = require('../../controllers/user/userController')

const router = express.Router();

//router.post('/signup',signup); API commented coz, it is not used anymore.
router.post('/form-signup',formSignup);
//router.post('/signin',signin);
router.post('/signin-with-otp',signinWithOTP);


module.exports = router;