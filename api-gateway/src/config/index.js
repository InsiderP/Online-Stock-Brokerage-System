// api-gateway/src/config/index.js
require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  SERVICES: {
    USER: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    ORDER: process.env.ORDER_SERVICE_URL || 'http://localhost:3002',
    STOCK: process.env.STOCK_SERVICE_URL || 'http://localhost:3003'
  },
  RATE_LIMIT: {
    WINDOW_MS: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: process.env.RATE_LIMIT_MAX || 100
  }
};