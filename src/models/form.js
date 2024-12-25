module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define('Form', {
      templateId: { type: DataTypes.INTEGER, allowNull: false },
      templateCreatorId: { type: DataTypes.INTEGER, allowNull: false },
      fillerId: { type: DataTypes.INTEGER, allowNull: false },
      custom_checkbox1_answer: { type: DataTypes.BOOLEAN, allowNull: true },
      custom_checkbox2_answer: { type: DataTypes.BOOLEAN, allowNull: true },
      custom_checkbox3_answer: { type: DataTypes.BOOLEAN, allowNull: true },
      custom_checkbox4_answer: { type: DataTypes.BOOLEAN, allowNull: true },
      custom_int1_answer: { type: DataTypes.INTEGER, allowNull: true },
      custom_int2_answer: { type: DataTypes.INTEGER, allowNull: true },
      custom_int3_answer: { type: DataTypes.INTEGER, allowNull: true },
      custom_int4_answer: { type: DataTypes.INTEGER, allowNull: true },
      custom_string1_answer: { type: DataTypes.STRING, allowNull: true },
      custom_string2_answer: { type: DataTypes.STRING, allowNull: true },
      custom_string3_answer: { type: DataTypes.STRING, allowNull: true },
      custom_string4_answer: { type: DataTypes.STRING, allowNull: true },
      custom_textarea1_answer: { type: DataTypes.TEXT, allowNull: true },
      custom_textarea2_answer: { type: DataTypes.TEXT, allowNull: true },
      custom_textarea3_answer: { type: DataTypes.TEXT, allowNull: true },
      custom_textarea4_answer: { type: DataTypes.TEXT, allowNull: true }
    });
  
    Form.associate = (models) => {
        Form.belongsTo(models.Template, { foreignKey: 'templateId', as: 'template' });
        Form.belongsTo(models.User, { foreignKey: 'templateCreatorId', as: 'templateCreator' });
        Form.belongsTo(models.User, { foreignKey: 'fillerId', as: 'filler' });
    };
  
    return Form;
};
