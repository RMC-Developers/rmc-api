const express = require("express");

const {signin,signup,signinWithOTP} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/signin-with-otp',signinWithOTP);


module.exports = router;