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
  PutusanTerdakwa.init({
    id_terdakwa: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_putusan: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PutusanTerdakwa',
    tableName: 'PutusanTerdakwa',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return PutusanTerdakwa;
};