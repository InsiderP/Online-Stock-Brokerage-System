// api-gateway/src/middlewares/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
      // Add user info to request
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        accountType: decoded.accountType
      };
      
      next();
    } catch (err) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};