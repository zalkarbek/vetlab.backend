const Service = require('./service');
const db = Service.getInject('db');

class RegionService extends Service {

  constructor() {
    super();
    this.region_fields = db.FIELDS.S_REGION;
    this.region_type_fields = db.FIELDS.S_REGION_TYPE;
  }

  // ========================= REGIONS TYPE ================================//

  async getRegionTypeById(id, options) {
    return db.sRegionType.findByPk(id, { ...options });
  }

  async getRegionTypes(options = {}) {
    return db.sRegionType.findAll(options);
  }

  async createRegionType(data) {
    return db.sRegionType.create(data, {
      fields: this.region_type_fields
    });
  }

  async updateRegionTypeById({ id, ...data }) {
    return db.sRegionType.update(data, {
      where: { id },
      fields: this.region_type_fields
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
    return db.sRegion.create(data, {
      fields: this.region_fields
    });
  }

  async updateRegionById({ id, ...data }) {
    return db.sRegion.update(data, {
      where: { id },
      fields: this.region_fields
    });
  }

  async destroyRegionById(id) {
    return db.sRegion.destroy({
      where: { id }
    });
  }
}

module.exports = new RegionService();
