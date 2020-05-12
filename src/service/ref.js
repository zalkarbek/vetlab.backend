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

  async search(model, {  search, searchColumn, searchPosition = 'substring', ...options }) {
    const safeOptions = await this.safeOptions(options);
    let where;
    if(searchPosition === 'startsWith')
      where = {
        [searchColumn]: {
          [db.Op.startsWith]: search
        }
      };
    else if(searchPosition === 'endsWith')
      where = {
        [searchColumn]: {
          [db.Op.endsWith]: search
        }
      };
    else
      where = {
        [searchColumn]: {
          [db.Op.substring]: search
        }
      };

    return db[model].findAll({
      where,
      ...safeOptions
    });
  }
}

module.exports = new RefService();
