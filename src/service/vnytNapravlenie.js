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
        // ============= Направил =====================//
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
        // ============= Принял =====================//
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
        },
        // ============= Отклонил =====================//
        {
          model: db.personal,
          as: 'rejectPersonal',
          include: [
            {
              model: db.sDoljnost
            }
          ]
        },
        {
          model: db.otdel,
          as: 'rejectOtdel'
        },
        {
          model: db.subOtdel,
          as: 'rejectSubOtdel'
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

  async getVnytNapravlenieById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.findByPk(id, {
      ...safeOptions,
      include: this.relations.includeWithAll,
    });
  }

  async getVnytByNapravlenieIdAndNapravlenOtdelId(napravlenieId, napravlenOtdelId, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.findAll({
      ...safeOptions,
      where: {
        napravlenieId,
        napravlenOtdelId
      },
      include: this.relations.includeWithAll,
    });
  }

  async getAllVnytNapravlenieRel(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.findAll({
      ...safeOptions,
      include: this.relations.includeWithAll,
    });
  }

  async getAllVnytNapravlenieRelPaginate(
    { page, pageSize, search, searchColumn, searchPosition = 'substring' },
    options = {}
    ) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db.vnytNapravlenie.findAndCountAll({
      ...safeOptions
      , ...paginate
      ,where: {
        ...searchWhere
      }
      ,include: this.relations.includeWithAll
      ,order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async personalAcceptVnytNapravlenie({ id, personalId, otdelId, subOtdelId }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.update({
      prinyalPersonalId: personalId,
      prinyalOtdelId: otdelId,
      prinyalSubOtdelId: subOtdelId,
      prinyalDate: new Date(),
      status: 'accepted'
    }, {
      where: { id },
      ...safeOptions
    });
  }

  async personalRejectNapravlenie({ id, personalId, otdelId, subOtdelId, rejectionDescription }) {
    return db.vnytNapravlenie.update({
      rejectPersonalId: personalId,
      rejectOtdelId: otdelId,
      rejectSubOtdelId: subOtdelId,
      rejectDate: new Date(),
      rejectionDescription: rejectionDescription,
      status: 'rejected'
    }, {
      where: { id }
    });
  }
}

module.exports = new NapravlenieService({ modelName: 'vnytNapravlenie' });
