'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Templates',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      templateCreatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      fillerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      custom_checkbox1_answer: { type: Sequelize.BOOLEAN, allowNull: true },
      custom_checkbox2_answer: { type: Sequelize.BOOLEAN, allowNull: true },
      custom_checkbox3_answer: { type: Sequelize.BOOLEAN, allowNull: true },
      custom_checkbox4_answer: { type: Sequelize.BOOLEAN, allowNull: true },
      custom_int1_answer: { type: Sequelize.INTEGER, allowNull: true },
      custom_int2_answer: { type: Sequelize.INTEGER, allowNull: true },
      custom_int3_answer: { type: Sequelize.INTEGER, allowNull: true },
      custom_int4_answer: { type: Sequelize.INTEGER, allowNull: true },
      custom_string1_answer: { type: Sequelize.STRING, allowNull: true },
      custom_string2_answer: { type: Sequelize.STRING, allowNull: true },
      custom_string3_answer: { type: Sequelize.STRING, allowNull: true },
      custom_string4_answer: { type: Sequelize.STRING, allowNull: true },
      custom_textarea1_answer: { type: Sequelize.TEXT, allowNull: true },
      custom_textarea2_answer: { type: Sequelize.TEXT, allowNull: true },
      custom_textarea3_answer: { type: Sequelize.TEXT, allowNull: true },
      custom_textarea4_answer: { type: Sequelize.TEXT, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Forms');
  }
};
