const Service = require('./service');
const db = Service.getInject('db');

class PosMaterialService extends Service {
  // ========================= REFERENCE ================================//
  async createMaterial(material, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create(material, { ...safeOptions });
  }

  async createMaterialsBulk(materials, options) {
    return db[this.modelName].bulkCreate(materials, options);
  }
}

module.exports = new PosMaterialService({ modelName: 'posMaterial' });
