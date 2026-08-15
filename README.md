# Smart Event Management & Ticketing Platform

## Overview
A full-stack event booking platform built for Advanced Events (Pty) Ltd, allowing
users to browse and book event tickets, and administrators to manage events,
capacity, bookings and enquiries.

## Technologies Used
- Node.js, Express.js
- EJS (server-side templates), Bootstrap 5
- MongoDB Atlas with Mongoose
- express-session + connect-mongo (authentication/session persistence)
- bcrypt (password hashing)

## Team Members and Roles
| Name | Role |
|------|------|
| TODO | Team Lead / Project Coordinator |
| TODO | Backend Developer |
| TODO | Frontend Developer |
| TODO | Database Engineer |
| TODO | Security / DevOps Engineer |

## Setup Instructions

1. **Clone the repo and install dependencies**
   ```
   npm install
   ```

2. **Create a MongoDB Atlas cluster** (free tier is enough)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster, add a database user, and allow your IP (or 0.0.0.0/0 for dev)
   - Copy the connection string from "Connect > Drivers"

3. **Configure environment variables**
   ```
   cp .env.example .env
   ```
   Then edit `.env` and set:
   - `MONGO_URI` — your Atlas connection string
   - `SESSION_SECRET` — any long random string

4. **Run the app in development**
   ```
   npm run dev
   ```
   Or for production-style run:
   ```
   npm start
   ```

5. Visit `http://localhost:3000`

## Project Structure
```
app.js                  Entry point: middleware, session, routes
config/db.js             Mongoose connection
models/                  Mongoose schemas (User, Event, Booking, Enquiry)
controllers/             Route handler logic
routes/                  Express routers, one per feature area
middleware/               auth.js (isAuthenticated/isAdmin), errorHandler.js
views/                    EJS templates, organized by feature
public/                   Static assets (CSS/JS)
```

## Status
Project scaffold in place (MVC structure, routing, middleware, DB connection,
session-based auth wiring, base views). Model fields, controller logic, and
UI polish are in progress.

## Reflection
TODO
