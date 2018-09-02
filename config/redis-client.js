const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {

            return new Error("Redis server refused connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {

            return new Error("Exceeded retry timeout");
        }
        if (options.attempt > 10) {

            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

client.on('connect', () => {
    console.info(`Redis server connected at: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
});

client.on('reconnecting', () => {
    console.info('Redis server reconnecting...');
});

module.exports = client;