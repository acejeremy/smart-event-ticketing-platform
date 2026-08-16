// Booking & Dashboard Page controller
// All routes using this controller are already protected by
// isAuthenticated in the router.
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// POST /bookings — create a booking for the logged-in user.
//
// Capacity control is done as a single atomic update: the filter itself
// requires ticketsSold + quantity <= capacity, so MongoDB only applies
// the $inc if there's still room. This avoids a race condition where two
// requests both read "5 tickets left", both decide it's fine, and both
// succeed — which a separate "check, then write" would allow.
async function createBooking(req, res, next) {
  try {
    const { eventId, quantity } = req.body;
    const requestedQuantity = parseInt(quantity, 10);

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.redirect(`/events/${eventId}?bookingError=Enter a valid number of tickets.`);
    }

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $expr: { $lte: [{ $add: ['$ticketsSold', requestedQuantity] }, '$capacity'] }
      },
      { $inc: { ticketsSold: requestedQuantity } },
      { new: true }
    );

    if (!event) {
      const stillExists = await Event.exists({ _id: eventId });
      if (!stillExists) {
        return res.redirect('/');
      }
      return res.redirect(`/events/${eventId}?bookingError=Not enough tickets remaining for that quantity.`);
    }

    try {
      await Booking.create({ user: req.session.user.id, event: event._id, quantity: requestedQuantity });
    } catch (bookingErr) {
      // Roll back the capacity reservation if the booking itself failed
      // to save, so tickets aren't lost to a phantom hold.
      await Event.updateOne({ _id: event._id }, { $inc: { ticketsSold: -requestedQuantity } });
      throw bookingErr;
    }

    res.redirect('/bookings/dashboard');
  } catch (err) {
    next(err);
  }
}

// GET /bookings/dashboard — for a standard user: show their booking
// history. For an admin: show analytics (total bookings, most popular
// events, capacity usage per event) instead.
async function getDashboard(req, res, next) {
  try {
    if (req.session.user.role === 'admin') {
      const totalBookings = await Booking.countDocuments();

      const popularEvents = await Booking.aggregate([
        { $group: { _id: '$event', ticketsBooked: { $sum: '$quantity' } } },
        { $sort: { ticketsBooked: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
        { $unwind: '$event' },
        { $project: { title: '$event.title', ticketsBooked: 1 } }
      ]);

      const capacityUsage = await Event.find().sort({ date: 1 });

      return res.render('bookings/dashboard', {
        bookings: null,
        analytics: { totalBookings, popularEvents, capacityUsage }
      });
    }

    const bookings = await Booking.find({ user: req.session.user.id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.render('bookings/dashboard', { bookings, analytics: null });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBooking, getDashboard };
