import { sql } from "../config/db.js";
import Stripe from "stripe";
import getUserFromClerk from "../lib/getUserFromClerk.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Step 1: Create booking and payment intent
export const createBooking = async (req, res) => {
  const { user_id } = await getUserFromClerk(req);
  const {
    room_type_name,
    check_in,
    check_out,
    adults,
    children = 0,
  } = req.body;

  if (!room_type_name || !check_in || !check_out || !adults) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 1️⃣ Find available room
    const [room] = await sql`
      SELECT r.room_number, rt.price_per_night, rt.name
      FROM rooms r
      JOIN room_types rt ON r.room_type_name = rt.name
      WHERE r.room_type_name = ${room_type_name}
        AND r.status = 'active'
        AND rt.max_adults >= ${adults}
        AND rt.max_children >= ${children}
        AND r.room_number NOT IN (
          SELECT b.room_number
          FROM bookings b
          WHERE b.status IN ('pending', 'confirmed')
            AND b.check_in < ${check_out}
            AND b.check_out > ${check_in}
        )
      LIMIT 1
    `;

    if (!room) {
      return res.status(409).json({
        message: "No available rooms for selected dates",
      });
    }

    // 2️⃣ Calculate total price
    const nights =
      (new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24);
    
    if (nights <= 0) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const total_price = room.price_per_night * nights;

    // 3️⃣ Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_price * 100), // Convert to cents
      currency: "usd", // or your currency
      metadata: {
        room_type: room.name,
        check_in,
        check_out,
        user_id: user_id.toString(),
      },
    });

    // 4️⃣ Create pending booking
    const [booking] = await sql`
      INSERT INTO bookings (
        user_id,
        room_number,
        check_in,
        check_out,
        adults,
        children,
        total_price,
        status,
        payment_status,
        payment_intent_id
      )
      VALUES (
        ${user_id},
        ${room.room_number},
        ${check_in},
        ${check_out},
        ${adults},
        ${children},
        ${total_price},
        'pending',
        'unpaid',
        ${paymentIntent.id}
      )
      RETURNING *
    `;

    return res.status(201).json({
      message: "Booking created. Please complete payment.",
      booking,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Step 2: Confirm booking after successful payment
export const confirmBooking = async (req, res) => {
  const { payment_intent_id } = req.body;

  if (!payment_intent_id) {
    return res.status(400).json({ message: "Payment intent ID required" });
  }

  try {
    // 1️⃣ Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ 
        message: "Payment not completed" 
      });
    }

    // 2️⃣ Update booking status
    const [booking] = await sql`
      UPDATE bookings
      SET 
        status = 'confirmed',
        payment_status = 'paid',
        updated_at = NOW()
      WHERE payment_intent_id = ${payment_intent_id}
      RETURNING *
    `;

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 3️⃣ TODO: Send confirmation email here
    // await sendBookingConfirmationEmail(booking);

    return res.status(200).json({
      message: "Booking confirmed successfully!",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings for the current user
export const getUserBookings = async (req, res) => {
  const { user_id } = await getUserFromClerk(req);

  try {
    const bookings = await sql`
      SELECT 
        b.*,
        rt.name as room_type_name,
        rt.price_per_night,
        r.status as room_status
      FROM bookings b
      JOIN rooms r ON b.room_number = r.room_number
      JOIN room_types rt ON r.room_type_name = rt.name
      WHERE b.user_id = ${user_id}
      ORDER BY b.created_at DESC
    `;

    return res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single booking by ID (must belong to the user)
export const getBookingById = async (req, res) => {
  const { user_id } = await getUserFromClerk(req);
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  try {
    const [booking] = await sql`
      SELECT 
        b.*,
        rt.name as room_type_name,
        rt.description as room_description,
        rt.price_per_night,
        rt.max_adults,
        rt.max_children,
        r.status as room_status
      FROM bookings b
      JOIN rooms r ON b.room_number = r.room_number
      JOIN room_types rt ON r.room_type_name = rt.name
      WHERE b.id = ${id} AND b.user_id = ${user_id}
    `;

    if (!booking) {
      return res.status(404).json({ 
        message: "Booking not found or you don't have access to it" 
      });
    }

    return res.status(200).json({
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel a booking (only if it hasn't started yet)
export const cancelBooking = async (req, res) => {
  const { user_id } = await getUserFromClerk(req);
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  try {
    // Check if booking exists and belongs to user
    const [booking] = await sql`
      SELECT * FROM bookings
      WHERE id = ${id} AND user_id = ${user_id}
    `;

    if (!booking) {
      return res.status(404).json({ 
        message: "Booking not found or you don't have access to it" 
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ 
        message: "Booking is already cancelled" 
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ 
        message: "Cannot cancel a completed booking" 
      });
    }

    // Check if check-in date has passed
    const checkInDate = new Date(booking.check_in);
    const now = new Date();
    
    if (checkInDate <= now) {
      return res.status(400).json({ 
        message: "Cannot cancel booking after check-in date" 
      });
    }

    // Check cancellation policy (24 hours before check-in)
    const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
    
    if (hoursUntilCheckIn < 24) {
      return res.status(400).json({ 
        message: "Cancellation must be made at least 24 hours before check-in" 
      });
    }

    // Update booking status
    const [cancelledBooking] = await sql`
      UPDATE bookings
      SET 
        status = 'cancelled',
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    // If payment was made, initiate refund
    if (booking.payment_status === 'paid' && booking.payment_intent_id) {
      try {
        await stripe.refunds.create({
          payment_intent: booking.payment_intent_id,
        });

        // Update payment status
        await sql`
          UPDATE bookings
          SET payment_status = 'refunded'
          WHERE id = ${id}
        `;
      } catch (stripeError) {
        console.error("Refund error:", stripeError);
        // Still return success but note refund needs manual processing
        return res.status(200).json({
          message: "Booking cancelled. Refund will be processed manually.",
          booking: cancelledBooking,
        });
      }
    }

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking: cancelledBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Webhook to handle Stripe events (recommended)
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Auto-confirm booking
      await sql`
        UPDATE bookings
        SET 
          status = 'confirmed',
          payment_status = 'paid',
          updated_at = NOW()
        WHERE payment_intent_id = ${paymentIntent.id}
      `;
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Mark booking as failed
      await sql`
        UPDATE bookings
        SET 
          status = 'failed',
          updated_at = NOW()
        WHERE payment_intent_id = ${failedPayment.id}
      `;
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Clean up pending bookings after timeout (run as cron job)
export const cleanupPendingBookings = async () => {
  try {
    await sql`
      UPDATE bookings
      SET status = 'cancelled'
      WHERE status = 'pending'
        AND payment_status = 'unpaid'
        AND created_at < NOW() - INTERVAL '10 minutes'
    `;
  } catch (error) {
    console.error("Cleanup error:", error);
  }
};