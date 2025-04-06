// user-service/src/app.js
const express = require('express');
const sequelize = require('../config/db');
const authRoutes = require('./routes/auth-routes');
const accountRoutes = require('./routes/account-routes');
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const app = express();
// const swaggerDoc = YAML.load('./swagger.yaml');

// Database Connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
// app.use('/accounts', accountRoutes);

// Documentation
// app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = app;