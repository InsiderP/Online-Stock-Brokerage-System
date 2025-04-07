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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      availableFunds: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
      },
      status: {
        type: DataTypes.ENUM('ACTIVE', 'SUSPENDED', 'BLACKLISTED'),
        defaultValue: 'ACTIVE'
      },
      accountType: {
        type: DataTypes.ENUM('ADMIN', 'MEMBER'),
        defaultValue: 'MEMBER'
      }
    }, {
      tableName: 'users',
      timestamps: true
    });
  
    return User;
  };