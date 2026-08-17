// Contact / Enquiry Management Page controller
const Enquiry = require('../models/Enquiry');

// GET /contact — render the enquiry form.
function getContactForm(req, res) {
  res.render('contact/index', { error: null, sent: req.query.sent === 'true', formData: {} });
}

// POST /contact — store the enquiry in the database.
async function submitEnquiry(req, res, next) {
  try {
    const { name, email, message } = req.body;
    await Enquiry.create({
      name,
      email,
      message,
      user: req.session.user ? req.session.user.id : undefined
    });
    res.redirect('/contact?sent=true');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.render('contact/index', {
        error: 'Please fill in all fields.',
        sent: false,
        formData: req.body
      });
    }
    next(err);
  }
}

// GET /contact/admin — admin-only: list all enquiries, newest first.
async function listEnquiries(req, res, next) {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.render('contact/admin', { enquiries });
  } catch (err) {
    next(err);
  }
}

// POST /contact/admin/:id/status — admin-only: mark an enquiry as
// read/resolved/new.
async function updateEnquiryStatus(req, res, next) {
  try {
    const { status } = req.body;
    await Enquiry.findByIdAndUpdate(req.params.id, { status });
    res.redirect('/contact/admin');
  } catch (err) {
    next(err);
  }
}

module.exports = { getContactForm, submitEnquiry, listEnquiries, updateEnquiryStatus };
