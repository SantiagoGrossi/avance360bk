'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cancha', 'establecimientoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Establecimiento',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cancha', 'establecimientoId');
  }
};
