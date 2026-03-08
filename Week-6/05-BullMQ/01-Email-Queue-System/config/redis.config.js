const { Redis } = require("ioredis");

/* 1. Establish Redis Connection */
const connection = new Redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
})

module.exports = connection;