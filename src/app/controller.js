const Container = require('../container');

class Controller {
  static getService(name) {
    return Container.getInject('service').getService(name);
  }

  static getInject(name) {
    return Container.getInject(name);
  }
}

module.exports = Controller;
