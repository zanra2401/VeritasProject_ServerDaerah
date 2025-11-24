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
      this.belongsToMany(models.Putusan, {
        through: models.PutusanTerdakwa,
        foreignKey: 'id_terdakwa',
        otherKey: 'id_putusan',
        as: 'putusan'
      });
    }
  }
  Terdakwa.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    nama: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Terdakwa',
    tableName: 'Terdakwa',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Terdakwa;
};