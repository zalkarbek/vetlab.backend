const Service = require('./service');
const db = Service.getInject('db');
const departmentService = require('./department');

class OtdelService extends Service {
  // ========================= REFERENCE ================================//
  async getOtdelById(otdelId, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(otdelId, { ...safeOptions });
  }

  async getAll(model, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions,
      where: {
        nonSpecOtdel: 0
      }
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      , where: {
        nonSpecOtdel: 0
      }
    });
  }

  async getWithNonSpec(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions
    });
  }

  async getWithNonSpecWithPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
    });
  }

  async getWithOtdelenia(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(id, {
      ...safeOptions,
      where: { id },
      include: [
        {
          model: db.sOtdelenia,
          as: 'sOtdelenia'
        }
      ]
    });
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
