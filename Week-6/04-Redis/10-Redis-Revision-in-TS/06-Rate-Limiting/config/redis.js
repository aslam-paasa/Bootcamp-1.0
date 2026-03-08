const redis = require("redis");

/**
 * 1. Create a redis client
 * 2. Connect to the redis server
 * 3. On error, log the error
 * 4. Export the redis client
 */
const redisClient = redis.createClient({
    username: 'default',
    password: 'oeU2QPjixXl6spdoXw5MhkZvDkNS1OxP',
    socket: {
        host: 'redis-16227.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16227
    }
});


module.exports = {
    redisClient
}