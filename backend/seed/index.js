import { sql } from "../config/db.js";
import { HOTEL_IMAGES } from "./hotel_images.js";
import { ROOM_TYPES } from "./room_type.js";

async function seedHotelImages() {
    console.log("🌱 Seeding hotel images...");

    try {
        for (const item of HOTEL_IMAGES) {
            await sql`
                INSERT INTO hotel_images (image_url)
                VALUES (${item.image_url})
            `;
        }
        console.log("✅ Hotel images seeding completed.");
    } catch (error) {
        console.error("❌ Failed to seed hotel images:", error);
    }
}

// seedHotelImages();

async function seedRoomTypes() {
    console.log("🌱 Seeding room types...");

    try {
        for (const type of ROOM_TYPES) {
            await sql`
                INSERT INTO room_types 
                (name, tagline, description, max_adults, max_children, size_sqm, price_per_night, image, features, amenities, inclusions, house_rules, check_in_time, check_out_time, is_active)
                VALUES (
                    ${type.name},
                    ${type.tagline},
                    ${type.description},
                    ${type.max_adults},
                    ${type.max_children},
                    ${type.size_sqm},
                    ${type.price_per_night},
                    ${type.image},  
                    ${type.features},
                    ${type.amenities}, 
                    ${type.inclusions}, 
                    ${type.house_rules},
                    ${type.check_in_time},
                    ${type.check_out_time},
                    ${type.is_active}
                )
            `;
        }
        console.log("✅ Room types seeding completed.");
    } catch (error) {
        console.error("❌ Failed to seed room types:", error);
    }
}

// Call these functions
(async () => {
    // await seedHotelImages();
    await seedRoomTypes();
})();
