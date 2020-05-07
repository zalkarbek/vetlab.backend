const Service = require('./service');
const db = Service.getInject('db');

class DepartmentService extends Service {
  // ========================= REFERENCE ================================//
  async getDepartmentById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(id, { ...safeOptions });
  }
}

module.exports = new DepartmentService({ modelName: 'department' });
