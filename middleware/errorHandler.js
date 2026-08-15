function notFoundHandler(req, res) {
  res.status(404).render('errors/404');
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).render('errors/500', {
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message
  });
}

module.exports = { notFoundHandler, errorHandler };
