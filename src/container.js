const service = require('./service');
const helpers = require('./helpers');
const middleware = require('./middleware');
const eventEmitter = require('./modules/event-module');
const db = require('./db/models');
const i18n = require('./i18n');
const pathResolve = require( '../pathResolve');

const LOCAL_EVENTS = require('./data/eventData');
const SOCKS = require('./data/socketData');
const USER_ROLES = require('./data/userRoleData');
const restApi = require('./data/rest');

const injectMap = new WeakMap();

class Container {
  constructor() {
    injectMap.set(this, {
      service
      ,helpers
      ,middleware
      ,eventEmitter
      ,db
      ,i18n
      ,pathResolve
      ,LOCAL_EVENTS
      ,SOCKS
      ,USER_ROLES
      ,restApi
    });

  }
  binding(injection) {
    const injects = injectMap.get(this);
    injectMap.set(this, { ...injection, ...injects });
  }

  bindingInject(name, inject) {
    const injects = injectMap.get(this);
    injects[name] = inject;
    injectMap.set(this, { ...injects });
  }

  getInject(injectName) {
    const inject = injectMap.get(this);
    if(inject.hasOwnProperty(injectName)) {
      return inject[injectName];
    }
  }

  getService(name) {
    return this.getInject('service').getService(name);
  }

  getHelper(name) {
    return this.getInject('helpers').getHelper(name);
  }

  getMiddleware(name) {
    return this.getInject('middleware').getMiddleware(name);
  }
}

module.exports = new Container();
