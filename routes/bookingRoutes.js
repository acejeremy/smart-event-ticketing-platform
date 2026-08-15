const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

router.use(isAuthenticated);

router.post('/', bookingController.createBooking);
router.get('/dashboard', bookingController.getDashboard);

module.exports = router;
