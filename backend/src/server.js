import { sql } from "../config/db.js";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

async function initDB() {
    console.log("🔄 Initializing database...");
    try {
        // hotel_images table
        await sql`
            CREATE TABLE IF NOT EXISTS hotel_images (
                image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                image_url TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("✅ hotel_images table created/verified");

        // users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                clerk_id VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        `;
        console.log("✅ Users table created/verified");

        // room_types table
        await sql`
            CREATE TABLE IF NOT EXISTS room_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL,
                tagline VARCHAR(100),
                description TEXT,
                max_adults INTEGER NOT NULL,
                max_children INTEGER DEFAULT 0,
                size_sqm INTEGER,
                price_per_night NUMERIC(10,2) NOT NULL,
                image TEXT NOT NULL,
                features TEXT[] NOT NULL DEFAULT '{}',
                amenities TEXT[] NOT NULL DEFAULT '{}',
                inclusions TEXT[] DEFAULT '{}',
                house_rules TEXT,
                check_in_time VARCHAR(50),
                check_out_time VARCHAR(50),
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;
        console.log("✅ room_types table created/verified");
        
        // rooms table
        await sql`
            CREATE TABLE IF NOT EXISTS rooms (
                id SERIAL PRIMARY KEY,
                room_number VARCHAR(10) UNIQUE NOT NULL,
                room_type_name VARCHAR(50) REFERENCES room_types(name) ON DELETE CASCADE,
                floor INTEGER,
                status VARCHAR(20) DEFAULT 'active',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;
        console.log("✅ rooms table created/verified");

        // bookings table with payment tracking
        await sql`
            CREATE TABLE IF NOT EXISTS bookings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            room_number VARCHAR(10) REFERENCES rooms(room_number) ON DELETE CASCADE,
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            adults INTEGER NOT NULL,
            children INTEGER DEFAULT 0,
            total_price NUMERIC(10,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'pending', -- pending | confirmed | cancelled | failed
            payment_status VARCHAR(20) DEFAULT 'unpaid', -- unpaid | paid | refunded
            payment_intent_id VARCHAR(255), -- Stripe payment intent ID
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )
        `;
        console.log("✅ bookings table created/verified");

    } catch (error) {
        console.error("❌ Error initDB:", error);
        process.exit(1);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});