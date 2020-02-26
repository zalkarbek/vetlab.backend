const authService = require('./auth');
const userService = require('./user');
const personalService = require('./personal');
const refService = require('./ref');
const regionService = require('./region');

class ServiceBinder {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
      personal: personalService,
      ref: refService,
      region: regionService
    };
  }

  getService(name) {
    return this.services[name];
  }
}

module.exports = new ServiceBinder();