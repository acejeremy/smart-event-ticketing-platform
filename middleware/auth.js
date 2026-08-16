// Reads req.session.user (set at login with {id, name, role}) and makes
// it available as req.currentUser and res.locals.currentUser for every
// view. Storing these fields directly in the session avoids a database
// lookup on every request.
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
