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
    }
  }
  Putusan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nomor_putusan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tingkat_proses: {
      type: DataTypes.STRING,
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
    tanggal_update: {
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
    url_document: {
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
  });
  return Putusan;
};