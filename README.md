🏨 Hotel Management System

* A full-stack hotel management web application that allows guests to browse available rooms, make reservations, and complete secure online payments.
* Provides a scalable foundation for hotel administrators to manage rooms, bookings, and pricing.
* Built with a modern React + TypeScript frontend, a Node.js/Express backend, PostgreSQL for data persistence, Clerk for authentication, and Stripe for payments.

🚀 Features

👥 Guest Features

🔐 Authentication & Authorization

* Secure authentication powered by Clerk
* Only authenticated users can book rooms, make payments, and view booking history

🏨 Room Browsing

* Browse rooms by category:

  * Standard Rooms
  * Deluxe Rooms
  * Executive Suites
  * Family Room
  * Luxury Suite
* View room details including:

  * Price per night
  * Room description
  * Amenities
  * Availability status

🛒 Booking & Reservation

* Select check-in and check-out dates
* Real-time availability validation
* Prevents double-booking of rooms

💳 Secure Payments

* Integrated Stripe Checkout
* Safe and reliable online payment processing
* Confirms bookings only after successful payment

📦 Booking Management

* View past and active bookings
* Access booking details and payment status

🛠️ Admin Features (Planned)

🚧 Admin Dashboard (Future Update)

* Room management (add, edit, delete rooms)
* Booking status management:

  * Pending
  * Confirmed
  * Checked-in
  * Checked-out
* Pricing and seasonal rate control
* Analytics and revenue insights
* User and role management

🔐 Role-Based Access Control

* Admin-only routes protected via middleware
* Admin roles stored and validated from PostgreSQL

🧰 Tech Stack

Frontend

* React
* TypeScript
* Zustand (state management)
* Axios
* Tailwind CSS

Backend

* Node.js
* Express
* PostgreSQL
* Clerk (authentication)
* Stripe (payments)
* Morgan (HTTP request logging)
* Helmet (security headers)
* CORS

🔗 API Overview

🏨 Rooms

* GET /api/rooms — Fetch all available rooms
* GET /api/rooms/standard — Fetch standard rooms
* GET /api/rooms/deluxe — Fetch deluxe rooms
* GET /api/rooms/suites — Fetch suites
* GET /api/rooms/:id — Fetch single room details

📅 Bookings

* GET /api/bookings — View authenticated user's bookings
* POST /api/bookings — Create a new booking
* GET /api/bookings/:id — View booking details

💳 Payments

* POST /api/payment — Create Stripe checkout session

🛠️ Admin (Protected – Future Update)

* POST /api/admin/rooms — Create a new room
* PUT /api/admin/rooms/:id — Update room details
* DELETE /api/admin/rooms/:id — Delete a room
* PUT /api/admin/bookings/:id/status — Update booking status

🔐 Authentication

* Authentication handled using Clerk middleware
* Only authenticated users can:

  * Book rooms
  * Make payments
  * View booking history
* Admin routes additionally protected using role-based authorization

🌱 Future Enhancements

* Admin dashboard with analytics and charts
* Dynamic pricing and seasonal discounts
* Promo codes and special offers
* Room service and add-on bookings
* Email notifications for bookings and payments
* Multi-hotel support

🧑‍💻 Author

* Emmanuel Cruz
* Full-Stack Developer
* GitHub: [https://github.com/ernesto571](https://github.com/ernesto571)
* LinkedIn: