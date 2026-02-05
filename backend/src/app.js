import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "../routes/auth.route.js"
import hotelImagesRoutes from "../routes/hotel_images.route.js"
import roomTypes from "../routes/room_types.route.js"
import bookingRoutes from "../routes/booking.route.js"
import cron from 'node-cron';
import { cleanupPendingBookings } from "../controllers/booking.controller.js";
import "dotenv/config";


const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
}));

app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// Log all requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`); // Fixed: parentheses, not backticks
    next();
});


app.use(clerkMiddleware());
app.use("/api/users", userRoutes);
app.use("/api", hotelImagesRoutes);
app.use("/api", roomTypes);
app.use("/api/bookings", bookingRoutes);

// Run cleanup every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Running booking cleanup...');
    await cleanupPendingBookings();
  });

// app.get("/", (req, res) => {
//     console.log("hotel backend");
//     res.send("backend on eb");
// });

export default app;
