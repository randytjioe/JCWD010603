"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Branch.init(
    {
      name: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      idCity: DataTypes.INTEGER,
      province: DataTypes.STRING,
      postalCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Branch",
      paranoid: true,
    }
  );
  return Branch;
};
