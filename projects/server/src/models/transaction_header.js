"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction_header.init(
    {
      noTrans: DataTypes.STRING,
      grandPrice: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER,
      imgUpload: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_header",
      paranoid: true,
    }
  );
  return Transaction_header;
};
