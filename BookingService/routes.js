var express = require('express');
// require controller
var BookingController = require('./controllers/bookingController');

var router = express.Router();

router.get('/', BookingController.index);

module.exports = router;