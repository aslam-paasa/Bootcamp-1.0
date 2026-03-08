const { Worker } = require('bullmq');
const connection = require('../config/redis.config.js')
const { EMAIL_QUEUE } = require('../queue/email.queue.js')
const sendEmail = require("../services/email.service.js")

/* 4. Create Email Worker: Queue Name, data(sendEmail()), connection */
const worker = new Worker(EMAIL_QUEUE, async(job) => {
    console.log("Processing Job", job.id);
    await sendEmail(job.data);
}, { connection })

/* 5. Queue Events */ 
worker.on('completed', (job) => {
    console.log(`Job ${job.id} compelted`);
})

worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed`, err.message);
})