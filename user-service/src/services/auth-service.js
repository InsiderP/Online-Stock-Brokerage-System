const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../../config');

module.exports = {
  validateCredentials: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  },

  generateToken: (user) => {
    return jwt.sign(
      { userId: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
};