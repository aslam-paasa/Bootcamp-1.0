import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

/**
 * Redis Client
 */
const redis = new Redis(process.env.REDIS_URL);

/**
 * EXERCISE 1: RATE LIMITER
 * > 10 requests/minute/user
 */
const rateLimiter = async (req, res, next) => {
  const userId = req.headers["user-id"] || "anonymous";
  const key = `rate:${userId}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60);
  }

  if (count > 10) {
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });
  }

  next();
};

app.get("/rate-limited-api", rateLimiter, (req, res) => {
  res.json({ message: "Request allowed" });
});

/**
 * Server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});