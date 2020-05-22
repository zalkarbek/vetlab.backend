const Service = require('./service');
const db = Service.getInject('db');

class RefService extends Service {
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
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[model].findAndCountAll({
      ...safeOptions
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

  async search(model, {
    page, pageSize,  search, searchColumn, searchPosition = 'substring', ...options
  }) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    let where = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db[model].findAndCountAll({
      where,
      ...safeOptions
      , ...paginate
    });
  }
}

module.exports = new RefService();
