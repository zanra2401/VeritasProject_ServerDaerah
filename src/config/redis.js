const Redis = require('ioredis');

// Redis Publisher untuk ServerDaerah
const redisPublisher = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redisPublisher.on('connect', () => {
  console.log('✅ Redis Publisher connected');
});

redisPublisher.on('error', (err) => {
  console.error('❌ Redis Publisher Error:', err.message);
});

module.exports = redisPublisher;
