const Service = require('./service');
const db = Service.getInject('db');

class PosMaterialService extends Service {
  // ========================= REFERENCE ================================//

  async getAll(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions,
      include: [
        {
          model: db.sMaterial,
        }
      ],
      limit: 500
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate,
      include: [
        {
          model: db.sMaterial,
        }
      ]
    });
  }

  async createMaterial(material, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create(material, { ...safeOptions });
  }

  async createMaterialsBulk(materials, options) {
    return db[this.modelName].bulkCreate(materials, options);
  }
}

module.exports = new PosMaterialService({ modelName: 'posMaterial' });
