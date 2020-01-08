const tokenGenerator = require('../helpers/token-generator');
const db = require('../db/models/index');

class Service {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
    this.tokenGenerator = tokenGenerator;
  }
}

module.exports.Service = Service;
