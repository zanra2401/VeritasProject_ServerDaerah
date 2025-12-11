'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('PutusanHakim', {
 
      id_putusan: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Putusan',
          key: 'id'
        }
      },
      id_hakim: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Hakim',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("PutusanHakim", {
      fields: ['id_putusan', 'id_hakim'],
      type: 'primary key',
      name: 'pk_putusan_hakim'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('PutusanHakim');
  }
};
