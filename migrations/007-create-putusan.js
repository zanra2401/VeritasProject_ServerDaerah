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

    await queryInterface.createTable('Putusan', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      nomor: {  
        allowNull: false,
        type: Sequelize.STRING
      },
      tingkat_proses: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_klasifikasi: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Klasifikasi",
          key: "id"
        }
      },
      id_kata_kunci: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "KataKunci",
          key: "id"
        }
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
      tanggal_upload: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:  Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      amar_putusan: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      id_hakim_ketua: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Hakim",
          key: "id"
        }
      },
      id_panitera: {
        allowNull: false,
        type: Sequelize.UUID
      },
      id_penuntut_umum: {
        allowNull: true,
        type: Sequelize.UUID
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
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Putusan");
  }
};
