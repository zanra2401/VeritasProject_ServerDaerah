'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terdakwa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Terdakwa.init({
    nama_terdakwa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Terdakwa',
  });
  return Terdakwa;
};