const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const adminEventController = require('../controllers/adminEventController');

// Every route here requires a logged-in admin.
router.use(isAuthenticated, isAdmin);

router.get('/', adminEventController.listEventsForAdmin);
router.get('/new', adminEventController.getCreateForm);
router.post('/', adminEventController.createEvent);
router.get('/:id/edit', adminEventController.getEditForm);
router.post('/:id', adminEventController.updateEvent);
router.post('/:id/delete', adminEventController.deleteEvent);

module.exports = router;
