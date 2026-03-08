const { Queue } = require('bullmq');
const connection = require('../config/redis.config.js')

const EMAIL_QUEUE = 'emailQueue'

/* 2. Create Email Queue & provide redis connection */

const emailQueue = new Queue(EMAIL_QUEUE, { connection });

module.exports = { emailQueue, EMAIL_QUEUE };