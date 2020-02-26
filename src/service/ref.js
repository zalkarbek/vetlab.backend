const Service = require('./service');
const db = Service.getInject('db');

class RefService extends Service {
  constructor() {
    super();
  }
  // ========================= REFERENCE ================================//
  async getById(model, id, options) {
    return db[model].findByPk(id, { ...options });
  }

  async getAll(model, options = {}) {
    return db[model].findAll(options);
  }

  async create(model, data) {
    return db[model].create(data);
  }

  async updateById(model, { id, ...data }, options = {}) {
    return db[model].update(data, {
      where: { id },
      ...options
    });
  }

  async destroyById(model, id) {
    return db[model].destroy({
      where: { id }
    });
  }
}

module.exports = new RefService();
