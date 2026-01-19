import { sql } from "../config/db.js";
import { clerkClient } from "@clerk/express";

// Create user profile after Clerk authentication
export const createUserProfile = async (req, res) => {
    console.log("📝 createUserProfile: Starting...");
    try {
      const clerkUserId = req.auth.userId;
      
      const clerkUser = await clerkClient.users.getUser(clerkUserId);
      console.log("📋 Clerk user data:", {
        id: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        lastSignInAt: clerkUser.lastSignInAt
      });
      
      const email = clerkUser.emailAddresses?.[0]?.emailAddress || null;
      const firstName = clerkUser.firstName || null;
      const lastName = clerkUser.lastName || null;
      const lastLogin = clerkUser.lastSignInAt ? new Date(Number(clerkUser.lastSignInAt)) : null; // ✅ Fixed
  
      const result = await sql`
        INSERT INTO users (clerk_id, email, first_name, last_name, last_login)
        VALUES (${clerkUserId}, ${email}, ${firstName}, ${lastName}, ${lastLogin})
        ON CONFLICT (clerk_id) DO NOTHING
        RETURNING *
      `;
      
      console.log("✅ Profile created/found:", result);
      res.json({ message: "Profile created.", profile: result[0] });
    } catch (err) {
      console.error("❌ createUserProfile error:", err);
      res.status(500).json({ error: err.message });
    }
};

// Get logged in user's profile
export const getUserProfile = async (req, res) => {
  console.log("🔍 getUserProfile: Starting...");
  try {
    const clerkUserId = req.auth.userId;
    console.log("👤 Fetching profile for Clerk ID:", clerkUserId);
    
    const result = await sql`
      SELECT * FROM users WHERE clerk_id = ${clerkUserId} LIMIT 1
    `;
    
    console.log("📊 Query result:", result);
    
    if (!result[0]) {
      console.log("⚠️ No profile found for user");
      return res.status(404).json({ error: "Profile not found" });
    }
    
    console.log("✅ Profile found:", result[0]);
    res.json(result[0]);
  } catch (err) {
    console.error("❌ getUserProfile error:", err);
    res.status(500).json({ error: err.message });
  }
};