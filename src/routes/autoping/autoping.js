const express = require('express');

const autopingControllers = require('../../controllers/autopingControllers')

const router = express();


router.get('/get-user',autopingControllers.getUserDetails);

router.post('/notify-user',autopingControllers.notifyUser);


module.exports = router;