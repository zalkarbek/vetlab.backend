const Service = require('./service');
const db = Service.getInject('db');

class PosMaterialService extends Service {
  // ========================= REFERENCE ================================//
  constructor(params) {
    super(params);
    this.relations = {
      includePub: []
    };
  }

  async getAll(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions,
      limit: 500
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions({
      ...options,
    });
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
    });
  }

  async getById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(id, {
      ...safeOptions,
    });
  }

}

module.exports = new PosMaterialService({ modelName: 'sMaterial' });
