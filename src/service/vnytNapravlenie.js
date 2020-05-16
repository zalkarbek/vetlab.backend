const Service = require('./service');
const db = Service.getInject('db');

class NapravlenieService extends Service {

  constructor(params) {
    super(params);
    this.relations = {
      includeWithAll: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMaterial,
            },
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.personal,
          as: 'napravilPersonal',
          include: [
            {
              model: db.sDoljnost
            }
          ]
        },
        {
          model: db.department,
          as: 'napravlenDepartment'
        },
        {
          model: db.otdel,
          as: 'napravlenOtdel'
        },
        {
          model: db.subOtdel,
          as: 'napravlenSubOtdel'
        },
        {
          model: db.personal,
          as: 'prinyalPersonal',
          include: [
            {
              model: db.sDoljnost
            }
          ]
        },
        {
          model: db.otdel,
          as: 'prinyalOtdel'
        },
        {
          model: db.subOtdel,
          as: 'prinyalSubOtdel'
        }
      ]
    };
  }
  // ========================= REFERENCE ================================//
  async createVnytNapravlenie(data, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.create(data, { ...safeOptions });
  }

  async updateVnytNapravlenieStatus(id, status, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.update({ status }, {
      where: { id },
      ...safeOptions
    });
  }

  async getAllVnytNapravlenieRel(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.findAll({
      ...safeOptions,
      include: this.relations.includeWithAll,
    });
  }

  async getAllVnytNapravlenieRelPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db.vnytNapravlenie.findAndCountAll({
      ...safeOptions
      , ...paginate,
      include: this.relations.includeWithAll
    });
  }
}

module.exports = new NapravlenieService({ modelName: 'vnytNapravlenie' });
