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

      PutusanHakim.belongsTo(models.Putusan, {
        foreignKey: "id_putusan",
        as: 'putusan'
      });

      PutusanHakim.belongsTo(models.Hakim, {
        foreignKey: "id_hakim",
        as: "hakim"
      })

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
  });
  return PutusanHakim;
};