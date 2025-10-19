'use strict';
const {
  Model
} = require('sequelize');

export default (sequelize, DataTypes) => {
  class PenuntutUmum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PenuntutUmum.init({
    nama_penuntut_umum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PenuntutUmum',
  });
  return PenuntutUmum;
};