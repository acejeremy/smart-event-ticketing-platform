require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./config/db');
const { attachUserToLocals } = require('./middleware/auth');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const adminEventRoutes = require('./routes/adminEventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 4 } // 4 hours
  })
);

// Makes currentUser available in every EJS view without passing it manually each time
app.use(attachUserToLocals);

// Makes the current path available for highlighting the active nav link
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// TODO (team): mount routes for each of the 5 mandatory pages
app.use('/', eventRoutes); // Home / Event Listing
app.use('/auth', authRoutes); // User Authentication
app.use('/admin/events', adminEventRoutes); // Event Management (admin only)
app.use('/bookings', bookingRoutes); // Booking & Dashboard
app.use('/contact', contactRoutes); // Contact / Enquiry Management

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
