const express = require("express");

const adminController = require('../../controllers/admin/adminController')

const router = express.Router();

router.post('/create-service-category',adminController.createServiceCategory);

module.exports = router;