const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContactForm);
router.post('/', contactController.submitEnquiry);
router.get('/admin', isAuthenticated, isAdmin, contactController.listEnquiries);
router.post('/admin/:id/status', isAuthenticated, isAdmin, contactController.updateEnquiryStatus);

module.exports = router;
