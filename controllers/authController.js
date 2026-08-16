const User = require('../models/User');

// GET /auth/register — render the registration form.
function getRegisterForm(req, res) {
  res.render('auth/register', { error: null });
}

// POST /auth/register — create the User (password is hashed automatically
// by the model's pre-save hook), then redirect to login.
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.redirect('/auth/login');
  } catch (err) {
    if (err.code === 11000) {
      return res.render('auth/register', { error: 'That email is already registered.' });
    }
    next(err);
  }
}

// GET /auth/login — render the login form.
function getLoginForm(req, res) {
  res.render('auth/login', { error: null });
}

// POST /auth/login — verify credentials, then store the user
// (id, name, role) in req.session.user.
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = user ? await user.comparePassword(password) : false;

    if (!isMatch) {
      // Same message whether the email doesn't exist or the password is
      // wrong, so the response doesn't reveal which emails are registered.
      return res.render('auth/login', { error: 'Invalid email or password.' });
    }

    req.session.user = { id: user._id, name: user.name, role: user.role };
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
