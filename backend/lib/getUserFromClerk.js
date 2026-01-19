import { sql } from "../config/db.js";
import { clerkClient } from "@clerk/express";

// Helper function to get user info from Clerk and database
const getUserFromClerk = async (req) => {
  try {
    const clerkUserId = req.auth?.userId;
    
    if (!clerkUserId) {
      // User not authenticated, return guest info
      return { 
        user_id: null,
        user_first_name: "guest", 
        user_last_name: "" 
      };
    }

    // Get user from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    
    // Get user_id from database using clerk_id
    const dbUser = await sql`
      SELECT id FROM users WHERE clerk_id = ${clerkUserId} LIMIT 1
    `;

    if (dbUser.length === 0) {
      // User not in database yet, return clerk info without user_id
      return {
        user_id: null,
        user_first_name: clerkUser.firstName || "",
        user_last_name: clerkUser.lastName || ""
      };
    }

    return {
      user_id: dbUser[0].id,
      user_first_name: clerkUser.firstName || "",
      user_last_name: clerkUser.lastName || ""
    };
  } catch (error) {
    console.error("Error fetching user from Clerk:", error);
    return { 
      user_id: null,
      user_first_name: "", 
      user_last_name: "" 
    };
  }
};

export default getUserFromClerk