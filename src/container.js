const service = require('./service');
const helpers = require('./helpers');
const eventEmitter = require('./modules/event-module');

const db = require('./db/models');
const i18n = require('./i18n');
const pathResolve = require( '../pathResolve');

const EVENTS = require('./data/eventData');
const SOCKS = require('./data/socketData');
const USER_ROLES = require('./data/userRoleData');

const injectMap = new Map();
injectMap.set('inject', {
  eventEmitter
  ,helpers
  ,EVENTS
  ,SOCKS
  ,USER_ROLES
  ,service
  ,pathResolve
  ,db
  ,i18n
});

class Container {

  static binding(bindingInjection) {
    const injects = injectMap.get('inject');
    injectMap.set('inject', { ...bindingInjection, ...injects });
  }

  static getInject(injectName) {
    const inject = injectMap.get('inject');
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }

  static getService(name) {
    return this.getInject('service').getService(name);
  }

  static getHelper(name) {
    return this.getInject('helpers').getHelper(name);
  }
}

module.exports = Container;
