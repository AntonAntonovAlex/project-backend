module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    value: DataTypes.STRING,
  }, {
    tableName: 'Topics',
    timestamps: false
  });
  return Topic;
};
