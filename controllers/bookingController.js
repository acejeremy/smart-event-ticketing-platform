// Booking & Dashboard Page controller
// TODO (team): implement each handler. All routes using this controller
// are already protected by isAuthenticated in the router.

// POST /bookings — create a booking for the logged-in user. Must
// validate that quantity requested doesn't exceed the event's
// remaining capacity before saving (automated capacity control).
async function createBooking(req, res, next) {
  try {
    res.redirect('/bookings/dashboard');
  } catch (err) {
    next(err);
  }
}

// GET /bookings/dashboard — for a standard user: show their booking
// history. For an admin: also show analytics (total bookings, most
// popular events, capacity usage per event).
async function getDashboard(req, res, next) {
  try {
    res.render('bookings/dashboard', { bookings: [] });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBooking, getDashboard };
