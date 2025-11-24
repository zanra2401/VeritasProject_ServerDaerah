'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hakim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */   
    static associate(models) {
      // define association here
      this.belongsToMany(models.Putusan, {
        through: models.PutusanHakim,
        foreignKey: 'id_hakim',
        otherKey: 'id_putusan',
        as: 'putusan'
      });
    }
  }

  Hakim.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4  ,
      allowNull: false,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Hakim',
    tableName: 'Hakim',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  return Hakim;
};