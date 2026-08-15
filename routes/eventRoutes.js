const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.listEvents);
router.get('/events/:id', eventController.getEventDetails);

module.exports = router;
