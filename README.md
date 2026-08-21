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
This project was completed individually rather than by a group of five.

| Name | Roles covered |
|------|----------------|
| Jeremy Li | Team Lead, Backend, Frontend, Database, Security/DevOps (all roles) |

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
   - `ADMIN_NAME` — display name for the seeded administrator
   - `ADMIN_EMAIL` — login email for the seeded administrator
   - `ADMIN_PASSWORD` — administrator password (minimum 8 characters)

4. **Create the administrator account**
   ```
   npm run seed:admin
   ```
   This command creates the admin if the email is new. If that email already
   belongs to a registered user, it promotes the account to admin and updates
   its name and password. Never commit your real admin password to GitHub.

5. **Run the app in development**
   ```
   npm run dev
   ```
   Or for production-style run:
   ```
   npm start
   ```

6. Visit `http://localhost:3000`

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
All five mandatory pages are implemented and functional: Home/Event Listing,
User Authentication, Event Management (admin), Booking & Dashboard, and
Contact/Enquiry Management. Styling pass complete (custom theme, responsive
tables, active nav state, mobile-friendly navbar).

## Reflection
This project was originally scoped for a group of five, covering distinct
roles — Team Lead, Backend, Frontend, Database, Security/DevOps. I ended up
building it on my own, which meant picking up every one of those roles
myself instead of specializing in one, and making a lot of decisions that
would normally have been split across a team discussion.

A few things stood out from the process:

- **Capacity control was the hardest technical problem, not the biggest
  one.** It would have been easy to write "check remaining tickets, then
  create the booking" as two separate steps, but that has a race condition:
  two people booking the last ticket at the same instant could both pass
  the check and both succeed, overselling the event. I used a single atomic
  MongoDB update instead, where the update's own filter enforces
  `ticketsSold + quantity <= capacity`, so only one of two competing
  requests for the last ticket can actually go through. I verified this
  wasn't just theoretical by firing five simultaneous booking requests at
  an event with three tickets left and confirming exactly three succeeded.

- **Security decisions needed to be deliberate, not default.** Two examples:
  passwords are hashed with bcrypt via a schema-level pre-save hook so
  there's no path through the codebase that can accidentally store one in
  plaintext, and a failed login shows the same generic error whether the
  email doesn't exist or the password is wrong, so the app doesn't leak
  which emails are registered. I also had to fix a real vulnerability early
  on — the version of bcrypt the project started with pulled in an old,
  vulnerable build dependency, which I resolved by upgrading rather than
  ignoring the audit warning.

- **Working solo changed how I used Git.** Without teammates to split
  branches or review pull requests with, I focused on keeping each commit
  scoped to one complete feature — model, controller, and view together —
  so the commit history still reads as a clear, incremental build rather
  than one large dump at the end.

- **Real infrastructure brings real friction.** Setting up MongoDB Atlas
  meant working through an actual DNS resolution issue between Node's
  resolver and my router, rather than everything just working on the first
  try. Debugging that — and later a couple of "why isn't this working"
  moments that turned out to be a stale browser view rather than a bug in
  the code — was a good reminder to verify against the real, running
  system instead of assuming from the code alone.

Doing every role myself meant no specialization, but it also meant I
understand the full system end to end — there's no part of this project I
could point to and say "someone else built that."
