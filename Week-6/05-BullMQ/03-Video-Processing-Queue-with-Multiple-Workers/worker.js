import { videoProcessingWorker } from "./queues/worker.js";

async function startWorkers() {
    await videoProcessingWorker.run();
}

startWorkers();
