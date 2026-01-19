import express from "express";
import { getRoomTypes } from "../controllers/room_type.controller.js";

const router = express.Router();

router.get("/room-types" , getRoomTypes)

export default router;
