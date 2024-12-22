module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      allowedUsers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      custom_string1_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_string1_question: { type: DataTypes.STRING, allowNull: true },
      custom_string2_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_string2_question: { type: DataTypes.STRING, allowNull: true },
      custom_string3_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_string3_question: { type: DataTypes.STRING, allowNull: true },
      custom_string4_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_string4_question: { type: DataTypes.STRING, allowNull: true },
  
      custom_textarea1_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_textarea1_question: { type: DataTypes.STRING, allowNull: true },
      custom_textarea2_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_textarea2_question: { type: DataTypes.STRING, allowNull: true },
      custom_textarea3_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_textarea3_question: { type: DataTypes.STRING, allowNull: true },
      custom_textarea4_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_textarea4_question: { type: DataTypes.STRING, allowNull: true },
  
      custom_int1_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_int1_question: { type: DataTypes.STRING, allowNull: true },
      custom_int2_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_int2_question: { type: DataTypes.STRING, allowNull: true },
      custom_int3_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_int3_question: { type: DataTypes.STRING, allowNull: true },
      custom_int4_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_int4_question: { type: DataTypes.STRING, allowNull: true },
  
      custom_checkbox1_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_checkbox1_question: { type: DataTypes.STRING, allowNull: true },
      custom_checkbox2_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_checkbox2_question: { type: DataTypes.STRING, allowNull: true },
      custom_checkbox3_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_checkbox3_question: { type: DataTypes.STRING, allowNull: true },
      custom_checkbox4_state: { type: DataTypes.BOOLEAN, defaultValue: false },
      custom_checkbox4_question: { type: DataTypes.STRING, allowNull: true },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Template.associate = (models) => {
      Template.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
    };
    return Template;
  };
  