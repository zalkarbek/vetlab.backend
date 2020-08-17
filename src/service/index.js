const authService = require('./auth');
const userService = require('./user');
const roleService = require('./role');
const refService = require('./ref');
const regionService = require('./region');
const personalService = require('./personal');
const otdelService = require('./otdel');
const departmentService = require('./department');
const napravlenieService = require('./napravlenie');
const vnytNapravlenieService = require('./vnytNapravlenie');
const posMaterialService = require('./posMaterial');
const isledovanieService = require('./isledovanie');
const pokazatelService = require('./pokazatel');
const pokazatelPdkService = require('./pokazatelPdk');
const materialService = require('./material');
const reportService = require('./report');

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
      vnytNapravlenie: vnytNapravlenieService,
      posMaterial: posMaterialService,
      isledovanie: isledovanieService,
      pokazatel: pokazatelService,
      pokazatelPdk: pokazatelPdkService,
      material: materialService,
      report: reportService
    };
  }
  getService(name) {
    return this.services[name];
  }
}

module.exports = new ServiceBinder();
