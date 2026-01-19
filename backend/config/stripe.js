import Stripe from 'stripe';
import "dotenv/config";

// Check if key exists
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is not set in .env file!");
  console.error("   Please add: STRIPE_SECRET_KEY=sk_test_...");
  process.exit(1);
}

// Verify key format
if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') && !process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
  console.error("❌ Invalid STRIPE_SECRET_KEY format!");
  console.error("   Key should start with 'sk_test_' or 'sk_live_'");
  console.error("   Current key starts with:", process.env.STRIPE_SECRET_KEY.substring(0, 10));
  process.exit(1);
}

console.log("✅ Stripe Secret Key is set");
console.log("   Key type:", process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') ? 'TEST' : 'LIVE');
console.log("   Key preview:", process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...');

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use a stable API version
});