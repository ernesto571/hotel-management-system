import express from "express";
import { requireLogin } from "../middleware/auth.middleware.js";
import { 
  createBooking, 
  confirmBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  stripeWebhook 
} from "../controllers/booking.controller.js";

const router = express.Router();

// Create booking and get payment intent
router.post("/create", requireLogin, createBooking);

// Confirm booking after payment
router.post("/confirm", requireLogin, confirmBooking);

// Get all bookings for the logged-in user
router.get("/my-bookings", requireLogin, getUserBookings);

// Get a specific booking by ID (must belong to user)
router.get("/:id", requireLogin, getBookingById);

// Cancel a booking by ID
router.post("/:id/cancel", requireLogin, cancelBooking);

// Stripe webhook (no auth needed - Stripe validates)
router.post(
  "/webhook", 
  express.raw({ type: 'application/json' }), // Raw body for signature verification
  stripeWebhook
);

export default router;