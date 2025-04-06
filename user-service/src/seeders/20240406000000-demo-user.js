'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('users', [{
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'admin@example.com',
      passwordHash: passwordHash,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 