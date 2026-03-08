import { Redis } from "ioredis";

export const redisConnection = new Redis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null
});

redisConnection.connect();

export default redisConnection;