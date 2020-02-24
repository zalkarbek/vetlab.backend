const authService = require('./auth');
const userService = require('./user');
const personalService = require('./personal');

class ServiceBinder {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
      personal: personalService,
    };
  }

  getService(name) {
    return this.services[name];
  }
}

module.exports = new ServiceBinder();