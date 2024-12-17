'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Templates', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      topic: { type: Sequelize.STRING, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: true },
      isPublic: { type: Sequelize.BOOLEAN, defaultValue: true },
      allowedUsers: { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: true },

      custom_string1_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_string1_question: { type: Sequelize.STRING, allowNull: true },
      custom_string2_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_string2_question: { type: Sequelize.STRING, allowNull: true },
      custom_string3_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_string3_question: { type: Sequelize.STRING, allowNull: true },
      custom_string4_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_string4_question: { type: Sequelize.STRING, allowNull: true },

      custom_textarea1_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_textarea1_question: { type: Sequelize.STRING, allowNull: true },
      custom_textarea2_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_textarea2_question: { type: Sequelize.STRING, allowNull: true },
      custom_textarea3_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_textarea3_question: { type: Sequelize.STRING, allowNull: true },
      custom_textarea4_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_textarea4_question: { type: Sequelize.STRING, allowNull: true },

      custom_int1_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_int1_question: { type: Sequelize.STRING, allowNull: true },
      custom_int2_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_int2_question: { type: Sequelize.STRING, allowNull: true },
      custom_int3_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_int3_question: { type: Sequelize.STRING, allowNull: true },
      custom_int4_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_int4_question: { type: Sequelize.STRING, allowNull: true },

      custom_checkbox1_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_checkbox1_question: { type: Sequelize.STRING, allowNull: true },
      custom_checkbox2_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_checkbox2_question: { type: Sequelize.STRING, allowNull: true },
      custom_checkbox3_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_checkbox3_question: { type: Sequelize.STRING, allowNull: true },
      custom_checkbox4_state: { type: Sequelize.BOOLEAN, defaultValue: false },
      custom_checkbox4_question: { type: Sequelize.STRING, allowNull: true },

      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Templates');
  },
};
