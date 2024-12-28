const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.associate = (models) => {
    User.hasMany(models.Template, { foreignKey: 'userId', as: 'templates' });
    User.hasMany(models.Like, { foreignKey: 'userId', as: 'userLikes' });
  };

  return User;
};
