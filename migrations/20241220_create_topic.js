'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });

    await queryInterface.bulkInsert('Topics', [
      { value: 'Education' },
      { value: 'Test' },
      { value: 'Other' }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
    await queryInterface.dropTable('Topics');
  }
};