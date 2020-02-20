const db = require('../db/models/index');
const pathResolve = require( '../../pathResolve');
const socketData = require('../data/socketData');
const injectMap = new Map();

class Controller {
  constructor() {
    this.db = db;
    this.Op = db.Sequelize.Op;
    this.pathResolve = pathResolve;
    this.socketData = socketData;
  }

  static binding(injection) {
    injectMap.set('inject', injection);
    this.inject = injectMap;
  }

  static getInject(injectName) {
    const inject = injectMap.get('inject');
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }

}

module.exports.Controller = Controller;
