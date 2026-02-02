export const requireLogin = (req, res, next) => {
  console.log("🔐 Auth check:", {
    hasAuth: !!req.auth,
    userId: req.auth?.userId || "none"
  });
  
  if (!req.auth?.userId) {
    console.log("❌ Authentication failed: No userId");
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  console.log("✅ Authentication passed for user:", req.auth.userId);
  next();
  
};