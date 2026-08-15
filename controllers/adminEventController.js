// Event Management Page (Admin Only) controller
// TODO (team): implement each handler. All routes using this controller
// are already protected by isAuthenticated + isAdmin in the router.

// GET /admin/events — list all events with edit/delete actions.
async function listEventsForAdmin(req, res, next) {
  try {
    res.render('admin/events/index', { events: [] });
  } catch (err) {
    next(err);
  }
}

// GET /admin/events/new — render the create-event form.
function getCreateForm(req, res) {
  res.render('admin/events/new');
}

// POST /admin/events — create a new Event from form data.
async function createEvent(req, res, next) {
  try {
    res.redirect('/admin/events');
  } catch (err) {
    next(err);
  }
}

// GET /admin/events/:id/edit — render the edit-event form.
async function getEditForm(req, res, next) {
  try {
    res.render('admin/events/edit', { event: null });
  } catch (err) {
    next(err);
  }
}

// PUT/POST /admin/events/:id — update an existing event.
async function updateEvent(req, res, next) {
  try {
    res.redirect('/admin/events');
  } catch (err) {
    next(err);
  }
}

// DELETE/POST /admin/events/:id/delete — delete an event.
async function deleteEvent(req, res, next) {
  try {
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
