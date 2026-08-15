const mongoose = require('mongoose');

// TODO (team): design the fields for this schema to satisfy "Event
// Management" and "Home / Event Listing" from the brief. Think about:
//   - title, description, category, date, location
//   - capacity (total tickets) and how you'll derive/track remaining
//     availability (e.g. a separate "ticketsSold" counter, or compute
//     it from the Booking collection)
//   - createdBy (ref to User, the admin who created it)
//   - timestamps
// Also decide what validation belongs here (required fields, min
// capacity, date must be in the future, etc.) — that's part of the
// Database Design marks.
const eventSchema = new mongoose.Schema(
  {
    // fields go here
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
