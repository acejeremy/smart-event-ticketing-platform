const mongoose = require('mongoose');

const CATEGORIES = ['Conference', 'Workshop', 'Festival', 'Private Event'];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES
    },
    date: {
      type: Date,
      required: true,
      validate: {
        // Only enforced when the event is first created, so editing an
        // event after its date has passed (e.g. fixing a typo) doesn't
        // start failing validation.
        validator: function isFutureDate(value) {
          return this.isNew ? value > Date.now() : true;
        },
        message: 'Event date must be in the future.'
      }
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        // Runs on every save, including updates, so an admin can't edit an
        // event down to a capacity lower than the tickets already sold for
        // it (which would make ticketsSold > capacity, an inconsistent
        // state the booking logic and the remainingTickets virtual both
        // assume can't happen).
        validator: function capacityCoversSoldTickets(value) {
          return value >= this.ticketsSold;
        },
        message: 'Capacity cannot be less than the tickets already sold for this event.'
      }
    },
    ticketsSold: {
      type: Number,
      default: 0,
      min: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

eventSchema.virtual('remainingTickets').get(function remainingTickets() {
  return this.capacity - this.ticketsSold;
});

eventSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Event', eventSchema);
