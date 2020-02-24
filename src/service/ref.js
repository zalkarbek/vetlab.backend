const Service = require('./service');
const db = Service.getInject('db');

class RefService extends Service {

  constructor() {
    super();
    this.allFields = [ 'i18n', 'shortName', 'name', 'createdAt', 'updatedAt', 'deletedAt' ];
    this.publicFields = [ 'i18n', 'shortName', 'name' ];
  }

  async createMera(data) {
    return db.sMera.create(data, { fields: [ 'i18n', 'shortName', 'name' ] });
  }

  async updateMera(data) {
    const unit = await db.sMera.findByPk(data.id);
    return unit.update(data, { fields: [ 'i18n', 'shortName', 'name' ] });
  }

  async destroyMera({ id }) {
    const unit = await db.sMera.findByPk(id);
    return unit.destroy({ force: true });
  }
}

module.exports = new RefService();
