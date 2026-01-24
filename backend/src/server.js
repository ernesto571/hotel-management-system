import { sql } from "../config/db.js";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

async function initDB(){
    console.log("🔄 Initializing database...");
    try{

       // hotel_images table
       await sql`
            CREATE TABLE IF NOT EXISTS hotel_images  (
                image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                image_url TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
       `
       console.log("✅ hotel_images table created/verified");

        // users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                clerk_id varchar(255) UNIQUE NOT NULL,
                email varchar(255) UNIQUE NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )    
        `;

        console.log("✅ Users table created/verified");

        // room types table
        await sql`
            CREATE TABLE IF NOT EXISTS room_types (
                id SERIAL PRIMARY KEY ,
                name VARCHAR(50) UNIQUE NOT NULL,
                tagline VARCHAR(100), -- "Oceanview Deluxe Room"
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
            );
        `;
        console.log("✅ room types table created/verified");

    }catch(error) {
        console.error("❌ Error initDB:", error);
        process.exit(1); // Exit if database initialization fails
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});


