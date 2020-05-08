const Service = require('./service');
const db = Service.getInject('db');
const departmentService = require('./department');

class OtdelService extends Service {
  // ========================= REFERENCE ================================//
  async getOtdelById(otdelId, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(otdelId, { ...safeOptions });
  }

  async getDepartmentByOtdelId(otdelId, options = {}) {
    const otd = await this.getOtdelById(otdelId, options);
    if(otd && otd.departmentId) {
      return departmentService.getDepartmentById(otd.departmentId);
    }
    return null;
  }
}

module.exports = new OtdelService({ modelName: 'otdel' });
