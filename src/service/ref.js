const Service = require('./service');
const db = Service.getInject('db');

class RefService extends Service {
  constructor() {
    super();
  }

  // ========================= REFERENCE ================================//
  async getById(model, id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[model].findByPk(id, { ...safeOptions });
  }

  async getAll(model, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[model].findAll(safeOptions);
  }

  async getAllPaginate(model, { page, pageSize }, options = {}) {
    const paginate = await this.paginate({ page, pageSize });

    return db[model].findAndCountAll({
      ...options
      , ...paginate
    });
  }

  async create(model, data = {}) {
    return db[model].create(data);
  }

  async updateById(model, { id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[model].update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async destroyById(model, id) {
    return db[model].destroy({
      where: { id }
    });
  }
}

module.exports = new RefService();
