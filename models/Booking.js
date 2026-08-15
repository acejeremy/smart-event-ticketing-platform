const mongoose = require('mongoose');

// TODO (team): design the fields for this schema to satisfy "Ticket
// Booking System" (automated capacity control and booking validation)
// and "Booking & Dashboard Page" from the brief. Think about:
//   - user (ref to User, required)
//   - event (ref to Event, required)
//   - quantity / number of tickets
//   - status (e.g. 'confirmed', 'cancelled') if you want that flexibility
//   - timestamps
// The capacity-control logic (rejecting a booking that would exceed an
// event's capacity) belongs in the controller, but think here about
// whether you need any schema-level constraints or indexes to support it
// (e.g. a compound index, or storing quantity as a positive integer).
const bookingSchema = new mongoose.Schema(
  {
    // fields go here
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
