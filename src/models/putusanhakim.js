'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PutusanHakim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PutusanHakim.init({
    id_putusan: DataTypes.UUID,
    id_hakim: DataTypes.UUID,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PutusanHakim',
    tableName: 'PutusanHakim',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return PutusanHakim;
};