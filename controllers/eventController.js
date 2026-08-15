// Home / Event Listing Page controller
// TODO (team): implement each handler.

// GET / — list all events, supporting search/filter query params
// (?date=, ?category=, ?available=). Render views/events/index.ejs.
async function listEvents(req, res, next) {
  try {
    res.render('events/index', { events: [] });
  } catch (err) {
    next(err);
  }
}

// GET /events/:id — show one event's details and remaining ticket
// availability. Render views/events/show.ejs.
async function getEventDetails(req, res, next) {
  try {
    res.render('events/show', { event: null });
  } catch (err) {
    next(err);
  }
}

module.exports = { listEvents, getEventDetails };
