const Service = require('./service');
const db = Service.getInject('db');

class RegionService extends Service {

  constructor() {
    super();
  }

  // ========================= REGIONS TYPE ================================//

  async getRegionTypeById(id, options) {
    return db.sRegionType.findByPk(id, { ...options });
  }

  async getRegionTypes(options = {}) {
    return db.sRegionType.findAll(options);
  }

  async createRegionType(data) {
    return db.sRegionType.create(data);
  }

  async updateRegionTypeById({ id, ...data }) {
    return db.sRegionType.update(data, {
      where: { id }
    });
  }

  async destroyRegionTypeById(id) {
    return db.sRegionType.destroy({
      where: { id }
    });
  }

  // ========================= REGIONS ================================//

  async getRegionById(id, options) {
    return db.sRegion.findByPk(id, { ...options });
  }

  async getRegions(options) {
    return db.sRegion.findAll({
      ...options
    });
  }

  async createRegion(data) {
    return db.sRegion.create(data);
  }

  async updateRegionById({ id, ...data }) {
    return db.sRegion.update(data, {
      where: { id }
    });
  }

  async destroyRegionById(id) {
    return db.sRegion.destroy({
      where: { id }
    });
  }

  async getAll(model, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[model].findAll(safeOptions);
  }

  async getRegionsFullPathKg(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db['viewRegionFullPathKg'].findAll({ ...safeOptions });
  }

  async getRegionsFullPathKgPaginate({ page, pageSize, ...options }) {
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const safeOptions = await this.safeOptions(options);
    const where = await this.safeWhere(options);

    return db['viewRegionFullPathKg'].findAndCountAll({
      where,
      ...safeOptions,
      ...paginate
    });
  }

  async getRegionFullPathKgById(id = null, options = {}) {
    return db['viewRegionFullPathKg'].findByPk(id, { ...options });
  }
}

module.exports = new RegionService();
