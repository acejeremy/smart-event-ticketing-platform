// User Authentication Page controller
// TODO (team): implement each handler.

// GET /auth/register — render the registration form.
function getRegisterForm(req, res) {
  res.render('auth/register');
}

// POST /auth/register — hash the password with bcrypt, create the User,
// then redirect to login (or auto-login).
async function register(req, res, next) {
  try {
    res.redirect('/auth/login');
  } catch (err) {
    next(err);
  }
}

// GET /auth/login — render the login form.
function getLoginForm(req, res) {
  res.render('auth/login');
}

// POST /auth/login — verify credentials with bcrypt.compare, then store
// the user (id, name, role) in req.session.user.
async function login(req, res, next) {
  try {
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

// POST /auth/logout — destroy the session.
function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
}

module.exports = { getRegisterForm, register, getLoginForm, login, logout };
