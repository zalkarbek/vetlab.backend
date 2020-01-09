const tokenGenerator = require('../helpers/token-generator');
const db = require('../db/models/index');
const lodash = require('lodash');

class Service {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
    this.tokenGenerator = tokenGenerator;
    this._ = lodash;
  }
}

module.exports.Service = Service;
