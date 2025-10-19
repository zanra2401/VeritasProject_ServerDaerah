'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PutusanTerdakwa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  putusan - terdakwa.init({
    id: DataTypes.UUID,
    id_terdakwa: DataTypes.UUID,
    id_putusan: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'putusan-terdakwa',
  });
  return putusan - terdakwa;
};