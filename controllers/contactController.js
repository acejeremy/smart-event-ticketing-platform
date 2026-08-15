// Contact / Enquiry Management Page controller
// TODO (team): implement each handler.

// GET /contact — render the enquiry form.
function getContactForm(req, res) {
  res.render('contact/index');
}

// POST /contact — store the enquiry in the database.
async function submitEnquiry(req, res, next) {
  try {
    res.redirect('/contact');
  } catch (err) {
    next(err);
  }
}

// GET /contact/admin — admin-only: list all enquiries.
// Route must be protected by isAuthenticated + isAdmin.
async function listEnquiries(req, res, next) {
  try {
    res.render('contact/admin', { enquiries: [] });
  } catch (err) {
    next(err);
  }
}

module.exports = { getContactForm, submitEnquiry, listEnquiries };
