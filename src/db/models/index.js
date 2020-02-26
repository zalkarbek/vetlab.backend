const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/db')[env];
const FIELDS = require('../const/fields');
const QUERY = require('../const/queries');
const db = {};
let vetdb;

if (config.use_env_variable) {
  vetdb = new Sequelize(process.env[config.use_env_variable], config);
} else {
  vetdb = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = vetdb['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.vetdb = vetdb;
db.Sequelize = Sequelize;
db.FIELDS = FIELDS;
db.QUERY = QUERY;

module.exports = db;
