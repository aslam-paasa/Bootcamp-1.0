import express from "express";
import axios from "axios";
import Redis from "ioredis";

const app = express();
app.use(express.json());

/**
 * Redis Client
 */
const redis = new Redis(process.env.REDIS_URL);

/**
 * EXERCISE 2: CACHE LAYER (5 min)
 */
app.get("/posts", async (req, res) => {
  const cacheKey = "posts_cache";

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json({
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  await redis.set(
    cacheKey,
    JSON.stringify(response.data),
    "EX",
    300 // 5 minutes
  );

  res.json({
    source: "api",
    data: response.data,
  });
});


/**
 * Server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});