const authService = require('./authService');
const userService = require('./userService');
class Services {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
    };
  }
  getService(name) {
    return this.services[name];
  }
}

module.exports = new Services();