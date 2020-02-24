const service = require('./service');
const eventEmitter = require('./modules/event-module');
const db = require('./db/models');
const pathResolve = require( '../pathResolve');
const EVENTS = require('./data/eventData');
const SOCKS = require('./data/socketData');
const USER_ROLES = require('./data/userRoleData');

const injectMap = new Map();
injectMap.set('inject', {
  eventEmitter
  ,EVENTS
  ,SOCKS
  ,USER_ROLES
  ,service
  ,pathResolve
  ,db
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
}

module.exports = Container;
