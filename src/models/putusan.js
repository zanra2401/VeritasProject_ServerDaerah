'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Putusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Klasifikasi, {
        foreignKey: "id_klasifikasi",
        as: "klasifikasi"
      });

      this.belongsTo(models.KataKunci, {
        foreignKey: "id_kata_kunci",
        as: "kata_kunci"
      });

      this.belongsTo(models.Hakim, {
        foreignKey: "id_hakim_ketua",
        as: "hakim_ketua"
      });

      this.belongsTo(models.Panitera, {
        foreignKey: "id_panitera",
        as: "panitera"
      });

      this.belongsTo(models.PenuntutUmum, {
        foreignKey: "id_penuntut_umum",
        as: "penuntut_umum"
      });

      this.belongsToMany(models.Terdakwa, {
        through: models.PutusanTerdakwa,
        foreignKey: 'id_putusan',
        otherKey: 'id_terdakwa',
        as: 'terdakwa'
      });

      this.belongsToMany(models.Hakim, {
        through: models.PutusanHakim,
        foreignKey: 'id_putusan',
        otherKey: 'id_hakim',
        as: 'hakim_anggota'
      });
    }
  }
  Putusan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nomor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tingkat_proses: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_klasifikasi: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_kata_kunci: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tanggal_putusan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal_musyawarah: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    id_hakim_ketua: {
      type: DataTypes.UUID,
      allowNull: false
    },

    id_panitera: {
      type: DataTypes.UUID,
      allowNull: false
    },

    id_penuntut_umum: {
      type: DataTypes.UUID,
      allowNull: false 
    },

    tanggal_upload: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    amar_putusan: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    amar_lainya: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    catatan_amar: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    url_dokumen: {
      type: DataTypes.STRING,
      allowNull: true
    },

    lembaga_id : {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Putusan',
    tableName: 'Putusan',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Putusan;
};