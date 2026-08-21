# Smart Event Management & Ticketing Platform

## GitHub Repository
https://github.com/acejeremy/smart-event-ticketing-platform

## Overview
A full-stack event booking platform for Advanced Events (Pty) Ltd. Users can
browse events and book tickets, admins can manage events and view booking
analytics and enquiries. Built for the WPR371 brief.

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
All five required pages work: Home/Event Listing, Auth, Event Management
(admin), Booking & Dashboard, and Contact/Enquiry Management. Styling pass
is done too (custom theme, responsive tables, mobile nav).

## Reflection
This was supposed to be a group of five (Team Lead, Backend, Frontend,
Database, Security/DevOps), but I ended up doing it on my own, so I basically
had to be all five roles at once.

The hardest part wasn't any single feature, it was the ticket booking logic.
My first instinct was to check the remaining tickets, then create the
booking — but that's actually broken if two people try to book the last
ticket at the same time, since both requests could pass the check before
either one writes anything, and you'd oversell the event. I ended up doing
it as one atomic MongoDB update instead, where the filter itself checks
`ticketsSold + quantity <= capacity` before it lets the increment happen.
Tested it by firing 5 booking requests at once against an event with only 3
tickets left, and only 3 went through, so it actually works under real
concurrency and not just in the normal case.

A few other things worth mentioning:

Passwords are hashed with bcrypt through a pre-save hook on the User model,
so there's no code path that could accidentally save one in plaintext.
Login also gives the same "invalid email or password" message whether the
email doesn't exist or the password's wrong, so it doesn't leak which
emails are registered. I also had to bump the bcrypt version early on
because the one the scaffold started with pulled in a dependency with a
known critical vulnerability — easy to miss if you don't actually run
`npm audit`.

Doing this alone changed how I used Git too. No one to split branches or
review PRs with, so I just tried to keep commits scoped to one full feature
at a time (model + controller + view together) so the history still shows
how the project actually got built instead of one huge commit at the end.

Setting up MongoDB Atlas wasn't as plug-and-play as I expected either — hit
a weird DNS issue where Node couldn't resolve the connection string even
though my system could, had to switch to the non-SRV connection string to
get around it. Also had a couple of "why isn't this working" moments that
turned out to just be a stale browser tab and not an actual bug, which was
a good reminder to double check against the running app instead of just
assuming from the code.

Not having a team meant no one to bounce ideas off, but it also meant I
touched every part of this project myself, so there's nothing in here I
can't explain.
