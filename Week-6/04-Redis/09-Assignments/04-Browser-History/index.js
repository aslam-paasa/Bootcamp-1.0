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
 * EXERCISE 4: BROWSER HISTORY
 * > Stack-based (Back / Forward)
 */

/**
 * Visit page
 */
app.post("/history/visit", async (req, res) => {
  const { user, page } = req.body;

  await redis.lpush(`history:${user}:back`, page);
  await redis.del(`history:${user}:forward`);

  res.json({
    message: "Visited page",
    page,
  });
});

/**
 * Go back
 */
app.post("/history/back", async (req, res) => {
  const { user } = req.body;

  const current = await redis.lpop(`history:${user}:back`);
  if (!current) {
    return res.json({ message: "No history available" });
  }

  await redis.lpush(`history:${user}:forward`, current);

  const previous = await redis.lindex(`history:${user}:back`, 0);

  res.json({
    current: previous || null,
  });
});

/**
 * Go forward
 */
app.post("/history/forward", async (req, res) => {
  const { user } = req.body;

  const page = await redis.lpop(`history:${user}:forward`);
  if (!page) {
    return res.json({ message: "No forward history" });
  }

  await redis.lpush(`history:${user}:back`, page);

  res.json({
    current: page,
  });
});

/**
 * Server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});