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
    }
  }

  Hakim.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4  ,
      allowNull: false,
      primaryKey: true
    },
    nama_hakim: DataTypes.STRING,
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
  });

  return Hakim;
};