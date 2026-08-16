// Event Management Page (Admin Only) controller
// All routes using this controller are already protected by
// isAuthenticated + isAdmin in the router.
const Event = require('../models/Event');

function formatValidationError(err) {
  return Object.values(err.errors)
    .map((e) => e.message)
    .join(' ');
}

// GET /admin/events — list all events with edit/delete actions.
async function listEventsForAdmin(req, res, next) {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('admin/events/index', { events });
  } catch (err) {
    next(err);
  }
}

// GET /admin/events/new — render the create-event form.
function getCreateForm(req, res) {
  res.render('admin/events/new', { categories: Event.CATEGORIES, error: null, formData: {} });
}

// POST /admin/events — create a new Event from form data.
async function createEvent(req, res, next) {
  try {
    const { title, description, category, date, location, capacity } = req.body;
    await Event.create({
      title,
      description,
      category,
      date,
      location,
      capacity,
      createdBy: req.session.user.id
    });
    res.redirect('/admin/events');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.render('admin/events/new', {
        categories: Event.CATEGORIES,
        error: formatValidationError(err),
        formData: req.body
      });
    }
    next(err);
  }
}

// GET /admin/events/:id/edit — render the edit-event form.
async function getEditForm(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    res.render('admin/events/edit', { event, categories: Event.CATEGORIES, error: null });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.render('admin/events/edit', { event: null, categories: Event.CATEGORIES, error: null });
    }
    next(err);
  }
}

// PUT/POST /admin/events/:id — update an existing event.
async function updateEvent(req, res, next) {
  try {
    const { title, description, category, date, location, capacity } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.render('admin/events/edit', { event: null, categories: Event.CATEGORIES, error: null });
    }

    event.set({ title, description, category, date, location, capacity });
    await event.save();
    res.redirect('/admin/events');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.render('admin/events/edit', {
        event: { _id: req.params.id, ...req.body },
        categories: Event.CATEGORIES,
        error: formatValidationError(err)
      });
    }
    next(err);
  }
}

// DELETE/POST /admin/events/:id/delete — delete an event.
async function deleteEvent(req, res, next) {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/admin/events');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listEventsForAdmin,
  getCreateForm,
  createEvent,
  getEditForm,
  updateEvent,
  deleteEvent
};
