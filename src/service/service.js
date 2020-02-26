const lodash = require('lodash');
const tokenGenerator = require('../helpers/token-generator');
const helpers = require('../helpers');
const db = require('../db/models');
const pathResolve = require( '../../pathResolve');
const EVENTS = require('../data/eventData');
const SOCKS = require('../data/socketData');
const USER_ROLES = require('../data/userRoleData');

const injectMap = new Map();
injectMap.set('inject', {
  lodash
  ,helpers
  ,db
  ,EVENTS
  ,SOCKS
  ,USER_ROLES
  ,pathResolve
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

  static getHelper(name) {
    return Service.getInject('helpers').getHelper(name);
  }
}

module.exports = Service;
