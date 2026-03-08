import express from "express";
import { z } from "zod";
import { videoProcessingQueue } from "./queues/queue.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const requestVideoPostRequestSchema = z.object({
    videoUrl: z.string()
});


app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Hello World' });
});


app.post('/video-process', async (req, res) => {
    const validationResult = await requestVideoPostRequestSchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({ status: 'error', message: validationResult.error.message });
    }

    const { videoUrl } = validationResult.data;

    const job = await videoProcessingQueue.add(`video-${videoUrl}`, { videoUrl });

    res.json({ status: 'enqueued', jobId: job.id });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
