'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin")(sequelize,Sequelize)
db.branch = require("./branch")(sequelize,Sequelize)
db.user = require("./user")(sequelize,Sequelize)
db.user_detail = require("./user_detail")(sequelize,Sequelize)
db.address = require("./address")(sequelize,Sequelize)
db.product = require("./product")(sequelize,Sequelize)
db.category = require("./category")(sequelize,Sequelize)
db.stock = require("./stock")(sequelize,Sequelize)

// associate
db.admin.belongsTo(db.branch)
db.branch.hasOne(db.admin)

db.user_detail.belongsTo(db.user)
db.user.hasOne(db.user_detail)
db.address.belongsTo(db.user)

db.user.hasMany(db.address)
db.product.belongsTo(db.category)

db.category.hasMany(db.product)
db.user.hasMany(db.address)

db.stock.belongsTo(db.product)
db.product.hasMany(db.stock)
db.branch.hasMany(db.stock)

module.exports = db;
