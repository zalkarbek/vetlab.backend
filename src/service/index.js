const authService = require('./auth');
const userService = require('./user');
const roleService = require('./role');
const refService = require('./ref');
const regionService = require('./region');
const personalService = require('./personal');
const otdelService = require('./otdel');
const departmentService = require('./department');
const napravlenieService = require('./napravlenie');
const posMaterialService = require('./posMaterial');

class ServiceBinder {
  constructor() {
    this.services = {
      auth: authService,
      user: userService,
      role: roleService,
      ref: refService,
      region: regionService,
      personal: personalService,
      otdel: otdelService,
      department: departmentService,
      napravlenie: napravlenieService,
      posMaterial: posMaterialService
    };
  }
  getService(name) {
    return this.services[name];
  }
}

module.exports = new ServiceBinder();
