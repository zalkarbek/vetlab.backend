const db = require('../db/models/index');
const root = require( '../../pathResolve');

class Controller {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
    this.root = root;
  }
}

module.exports.Controller = Controller;
