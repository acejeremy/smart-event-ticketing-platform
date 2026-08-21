const Event = require('../models/Event');

// GET / — list upcoming events, supporting search/filter query params
// (?keyword=, ?category=, ?date=, ?available=). Render views/events/index.ejs.
async function listEvents(req, res, next) {
  try {
    const { keyword, category, date, available } = req.query;
    const filter = { date: { $gte: new Date() } };

    if (keyword) {
      // Escape regex special characters so a keyword like "C++" or "3.5"
      // is treated as a literal search term, not a broken/dangerous regex.
      const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escaped, 'i');
      filter.$or = [{ title: pattern }, { description: pattern }];
    }

    if (category) {
      filter.category = category;
    }

    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      filter.date = { $gte: startOfDay, $lt: endOfDay };
    }

    if (available === 'true') {
      filter.$expr = { $lt: ['$ticketsSold', '$capacity'] };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.render('events/index', {
      events,
      categories: Event.CATEGORIES,
      filters: req.query
    });
  } catch (err) {
    next(err);
  }
}

// GET /events/:id — show one event's details and remaining ticket
// availability. Render views/events/show.ejs.
async function getEventDetails(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    res.render('events/show', { event, bookingError: req.query.bookingError });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.render('events/show', { event: null, bookingError: null });
    }
    next(err);
  }
}

module.exports = { listEvents, getEventDetails };
