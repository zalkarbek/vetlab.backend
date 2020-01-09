const db = require('../db/models/index');

class Controller {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
  }
}

module.exports.Controller = Controller;
