'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hakim = await queryInterface.describeTable('Hakim');
    if (!hakim.deleted_at) {
      await queryInterface.addColumn('Hakim', 'deleted_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }

    const panitera = await queryInterface.describeTable('Panitera');
    if (!panitera.deleted_at) {
      await queryInterface.addColumn('Panitera', 'deleted_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
    } else {
      // Normalize column type in case it was created with the wrong Sequelize type constant.
      await queryInterface.changeColumn('Panitera', 'deleted_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const hakim = await queryInterface.describeTable('Hakim');
    if (hakim.deleted_at) {
      await queryInterface.removeColumn('Hakim', 'deleted_at');
    }

    const panitera = await queryInterface.describeTable('Panitera');
    if (panitera.deleted_at) {
      await queryInterface.removeColumn('Panitera', 'deleted_at');
    }
  }
};
