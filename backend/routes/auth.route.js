import express from "express";
import { requireLogin } from "../middleware/auth.middleware.js";
import { createUserProfile, getUserProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create-profile", requireLogin, createUserProfile);
router.get("/user-profile", requireLogin, getUserProfile);

export default router;