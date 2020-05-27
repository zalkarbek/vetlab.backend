const container = require('../container');

class Handler {
  static bindingInjects(injects) {
    container.binding(injects);
  }
  static bindingInject(name, inject) {
    container.bindingInject(name, inject);
  }
  static getInject(injectName) {
    return container.getInject(injectName);
  }
  static getService(name) {
    return container.getService(name);
  }
  static getSocks() {
    return this.getInject('SOCKS');
  }
  static getSocksEvents() {
    return this.getSocks().EVENTS;
  }
  static getLocalEvents() {
    return this.getInject('LOCAL_EVENTS');
  }
  static getMiddleware(name) {
    return container.getMiddleware(name);
  }
  static getHelper(name) {
    return container.getHelper(name);
  }

  bindingInjects(injects) {
    container.binding(injects);
  }
  bindingInject(name, inject) {
    container.bindingInject(name, inject);
  }
  getInject(injectName) {
    return container.getInject(injectName);
  }
  getService(name) {
    return container.getService(name);
  }
  getSocks() {
    return this.getInject('SOCKS');
  }
  getSocksEvents() {
    return this.getSocks().EVENTS;
  }
  getLocalEvents() {
    return this.getInject('LOCAL_EVENTS');
  }
  getMiddleware(name) {
    return container.getMiddleware(name);
  }
}

module.exports = Handler;
