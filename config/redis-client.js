const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL,
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

client.on("connect", () => {
    console.info(`Redis server connected at: ${process.env.REDIS_URL}`);
});

client.on("reconnecting", () => {
    console.info("Redis server reconnecting...");
});

module.exports = client;