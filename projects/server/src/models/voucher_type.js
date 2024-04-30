'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher_type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Voucher_type',
    paranoid: true
  });
  return Voucher_type;
};