import { sql } from "../config/db.js";

// ------------------- CACHING SETUP -------------------

// In-memory cache storage
const cache = {};
// 20 minutes TTL (Time To Live) in milliseconds
const CACHE_TTL = 20 * 60 * 1000; 

/**
 * Executes a SQL query, checking the cache first.
 * If the cache is valid, returns cached data. Otherwise, executes the query,
 * updates the cache, and returns fresh data.
 * * @param {string} key - Cache key (e.g., 'breakfast', 'all').
 * @param {function} queryFunction - The async function that executes the SQL query.
 * @returns {Promise<Array>} The menu data.
 */
const queryAndCache = async (key, queryFunction) => {
  const cachedItem = cache[key];
  const now = Date.now();

  // Check if cache exists and is still valid (less than CACHE_TTL old)
  if (cachedItem && now - cachedItem.timestamp < CACHE_TTL) {
    console.log(`[CACHE] Serving data for key: ${key} from cache.`);
    return cachedItem.data;
  }

  // Cache is invalid or non-existent, run the query
  console.log(`[CACHE] Cache miss or expired for key: ${key}. Fetching fresh data.`);
  const freshData = await queryFunction();

  // Store the fresh data in the cache
  cache[key] = {
    data: freshData,
    timestamp: now,
  };

  return freshData;
};

// ------------------- CONTROLLERS -------------------
export const getRoomTypes = async (req , res) => {
    try {
        const roomTypes = await queryAndCache('roomTypes', async () => {
            return await sql`
                SELECT * FROM room_types
            `
        })
        console.log("fetched all roomtypes count:", roomTypes.length);
    
        res.status(200).json({ success: true, data: roomTypes })
    } catch (error) {
        console.log("Error in getRoomTypes function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}