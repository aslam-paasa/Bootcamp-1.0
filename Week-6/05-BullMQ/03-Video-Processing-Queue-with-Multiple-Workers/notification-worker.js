import { notificationWorker } from "./queues/worker.js";

async function startWorkers() {
    await notificationWorker.run();
}

startWorkers();


/**
 * In separate terminal, run the following command to get the notification:
 * node notification-worker.js
*/