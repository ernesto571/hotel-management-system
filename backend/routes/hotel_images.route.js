import express from "express";
import { getHotelImages } from "../controllers/hotel_images.controller.js";

const router = express.Router();

router.get("/hotel-images", getHotelImages);

export default router;