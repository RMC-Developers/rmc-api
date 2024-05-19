const express = require("express");

const {createFuelEntry} = require('../../controllers/user/userController')

const router = express.Router();

router.post('/create-fuel-entry',createFuelEntry);


module.exports = router;