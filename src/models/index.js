'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '..', '..', 'config', 'config.json'))[env];
const db = {};

let sequelize;
//if (config.use_env_variable) {
//  sequelize = new Sequelize(process.env[config.use_env_variable], config);
//} else {

if (env === 'production' && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  //тут я не менял, остаётся
  //sequelize = new Sequelize(config.database, config.username, config.password, config);
  const config = require(path.resolve(__dirname, '..', '..', 'config', 'config.json'))[env];
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    port: config.port,
    dialectOptions: {
      ssl: false, // Отключаем SSL для локальной разработки
    },
    // Здесь не добавляем ssl для локальной разработки
  });
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

module.exports = db;
