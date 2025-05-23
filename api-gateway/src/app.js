// api-gateway/src/app.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');
const authMiddleware = require('./middlewares/auth');
const rateLimiter = require('./middlewares/rate-limiter');
const errorHandler = require('./utils/error-handling');
// const setupSwaggerUI = require('./config/swagger');

const app = express();

// Middlewares
app.use(express.json());
app.use(rateLimiter);

// // Swagger Documentation
// setupSwaggerUI(app);

// Service Routing
app.use('/api/auth', 
  createProxyMiddleware({
    target: config.SERVICES.USER,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '/auth'
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
          success: false,
          message: 'User service is not available. Please try again later.'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error connecting to user service'
      });
    },
    logLevel: 'debug'
  })
);

app.use('/api/users', authMiddleware,
  createProxyMiddleware({
    target: config.SERVICES.USER,
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/users'
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
          success: false,
          message: 'User service is not available. Please try again later.'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error connecting to user service'
      });
    },
    logLevel: 'debug'
  })
);

// Error Handling
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
  console.log(`User Service URL: ${config.SERVICES.USER}`);
});