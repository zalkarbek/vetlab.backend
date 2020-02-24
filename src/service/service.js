const tokenGenerator = require('../helpers/token-generator');
const lodash = require('lodash');

const db = require('../db/models');
const pathResolve = require( '../../pathResolve');
const EVENTS = require('../data/eventData');
const SOCKS = require('../data/socketData');
const USER_ROLES = require('../data/userRoleData');

const injectMap = new Map();
injectMap.set('inject', {
  EVENTS
  ,SOCKS
  ,USER_ROLES
  ,pathResolve
  ,db
});

class Service {
  constructor() {
    this.tokenGenerator = tokenGenerator;
    this._ = lodash;
  }

  static getInject(injectName) {
    const inject = injectMap.get('inject');
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }

  static getService(name) {
    return Service.getInject('service').getService(name);
  }
}

module.exports = Service;
