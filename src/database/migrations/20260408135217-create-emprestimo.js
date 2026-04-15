'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emprestimos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      livro_id: {
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER
      },
      data_devolucao_prevista: {
        type: Sequelize.DATEONLY
      },
      data_devolucao: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
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
    await queryInterface.dropTable('Emprestimos');
  }
};