const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'User',
      {
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, unique:true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
      },
      {
        defaultScope: {
          rawAttributes: { exclude: ['password'] },
        },
      },
  );

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Conversation, { foreignKey: 'userId', as: 'conversations' });
  };

  return User;
};