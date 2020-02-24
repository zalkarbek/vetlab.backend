const Service = require('./service');
const db = Service.getInject('db');

class RefService extends Service {

  constructor() {
    super();
    this.mera_fields = [ 'i18n', 'shortName', 'name' ];
  }

  async getAllMera() {
    return db.sMera.findAll();
  }

  async createMera(data) {
    return db.sMera.create(data, { fields: this.mera_fields });
  }

  async updateMera(data) {
    const unit = await db.sMera.findByPk(data.id);
    return unit.update(data, { fields: this.mera_fields });
  }

  async destroyMera({ id }) {
    const unit = await db.sMera.findByPk(id);
    return unit.destroy({ force: true });
  }
}

module.exports = new RefService();
