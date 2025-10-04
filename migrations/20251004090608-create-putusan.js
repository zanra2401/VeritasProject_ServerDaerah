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

    await queryInterface.createTable('putusan', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      nomor_putusan: {  
        allowNull: false,
        type: Sequelize.STRING
      },
      tinkat_proses: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tanggal_putusan: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tahun: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tanggal_musyawarah: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tangagl_upload: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      tanggal_update: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      amar_putusan: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      amar_lainya: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      catatan_amar: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      url_dokumen: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lembaga_id: {
        allowNull: false,
        type: Sequelize.UUID,
      }
    });

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
