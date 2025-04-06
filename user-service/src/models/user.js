// user-service/src/models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('ACTIVE', 'SUSPENDED'),
        defaultValue: 'ACTIVE'
      }
    }, {
      tableName: 'users',
      timestamps: true
    });
  
    return User;
  };