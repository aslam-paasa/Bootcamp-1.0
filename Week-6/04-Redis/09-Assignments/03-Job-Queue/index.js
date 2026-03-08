import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

/**
 * Redis Client
 */
const redis = new Redis(process.env.REDIS_URL);

/**
 * EXERCISE 3: JOB QUEUE (FIFO)
 */

/* Add job */
app.post("/jobs", async (req, res) => {
  const { job } = req.body;

  await redis.rpush("job_queue", JSON.stringify(job));

  res.json({ message: "Job added to queue" });
});

/* Process job */
app.post("/jobs/process", async (req, res) => {
  const job = await redis.lpop("job_queue");

  if (!job) {
    return res.json({ message: "No jobs in queue" });
  }

  const parsedJob = JSON.parse(job);

  /* simulate processing */
  console.log("Processing job:", parsedJob);

  res.json({
    message: "Job processed",
    job: parsedJob,
  });
});

/**
 * Server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});