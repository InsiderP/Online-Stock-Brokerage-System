// user-service/src/controllers/auth-controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../../config/db');

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, name, phone, address } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        email,
        passwordHash: hashedPassword,
        name,
        phone,
        address,
        availableFunds: 0.00,
        status: 'ACTIVE',
        accountType: 'MEMBER'
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          accountType: user.accountType 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ error: 'Account is not active' });
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          accountType: user.accountType 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ 
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          accountType: user.accountType
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};