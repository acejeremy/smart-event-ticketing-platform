// Reads req.session.userId (set at login) and makes the logged-in user
// available as req.currentUser and res.locals.currentUser for every view.
// TODO (team): once the User model exists, look it up here instead of
// storing the whole user in the session, e.g.:
//   const User = require('../models/User');
//   req.currentUser = await User.findById(req.session.userId).lean();
async function attachUserToLocals(req, res, next) {
  req.currentUser = req.session.user || null;
  res.locals.currentUser = req.currentUser;
  next();
}

// Blocks access unless a user is logged in.
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

// Blocks access unless the logged-in user has role 'admin'.
// Must run after isAuthenticated.
function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).render('errors/403');
  }
  next();
}

module.exports = { attachUserToLocals, isAuthenticated, isAdmin };
