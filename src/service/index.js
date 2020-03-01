const authService = require('./auth');
const userService = require('./user');
const roleService = require('./role');
const refService = require('./ref');
const regionService = require('./region');
const personalService = require('./personal');

class ServiceBinder {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
      role: roleService,
      ref: refService,
      region: regionService,
      personal: personalService,
    };
  }

  getService(name) {
    return this.services[name];
  }
}

module.exports = new ServiceBinder();
