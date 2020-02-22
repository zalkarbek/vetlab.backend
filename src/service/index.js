const { Service } = require('./service');
const authService = require('./authService');
const userService = require('./userService');

class ServiceBinder {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
    };
  }

  getService(name) {
    return this.services[name];
  }

  binding(injection) {
    Service.bind(injection);
  }
}

module.exports = new ServiceBinder();