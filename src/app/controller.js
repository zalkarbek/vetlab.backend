const db = require('../db/models/index');
const pathResolve = require( '../../pathResolve');
const socketData = require('../data/socketData');

class Controller {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
    this.pathResolve = pathResolve;
    this.socketData = socketData;
  }
}

module.exports.Controller = Controller;
