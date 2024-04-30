"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_detail.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      gender: DataTypes.BOOLEAN,
      imgUser: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User_detail",
      paranoid: true,
    }
  );
  return User_detail;
};
