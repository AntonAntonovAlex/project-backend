module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Template, { foreignKey: 'templateId', as: 'template' });
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    };
  
    return Comment;
};
