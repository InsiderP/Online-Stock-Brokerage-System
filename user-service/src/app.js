// user-service/src/app.js
const express = require('express');
const sequelize = require('../config/db');
const authRoutes = require('./routes/auth-routes');
const accountRoutes = require('./routes/account-routes');
const User = require('./models/user');
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const app = express();
// const swaggerDoc = YAML.load('./swagger.yaml');

// Database Connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    // Sync all models
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database models synced');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
// app.use('/accounts', accountRoutes);

// Documentation
// app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = app;