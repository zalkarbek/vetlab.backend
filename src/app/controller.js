const Container = require('../container');

class Controller {
  static getService(name) {
    return Container.getService(name);
  }

  static getInject(name) {
    return Container.getInject(name);
  }

  static getHelper(name) {
    return Container.getHelper(name);
  }
}

module.exports = Controller;
