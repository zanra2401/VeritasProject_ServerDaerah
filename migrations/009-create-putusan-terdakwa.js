'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PutusanTerdakwa', {
      id_terdakwa: {
        type: Sequelize.UUID,
        references: {
          model: "Terdakwa",
          key: "id"
        }
      },
      id_putusan: {
        type: Sequelize.UUID,
        references: {
          model: "Putusan",
          key: "id"
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

    await queryInterface.addConstraint('PutusanTerdakwa', {
      fields: ["id_terdakwa", "id_putusan"],
      type: "primary key",
      name: "putusan-terdakwa-pk"
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PutusanTerdakwa');
  }
};