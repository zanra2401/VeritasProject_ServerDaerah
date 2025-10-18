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
    await queryInterface.createTable('putusan_hakim', {
 
      id_putusan: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'putusan',
          key: 'id'
        }
      },
      id_hakim: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'hakim',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addConstraint("putusan_hakim", {
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
  }
};
