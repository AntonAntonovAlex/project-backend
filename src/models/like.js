module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Like.associate = (models) => {
      Like.belongsTo(models.Template, { foreignKey: 'templateId', as: 'template' });
      Like.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Like;
  };
  