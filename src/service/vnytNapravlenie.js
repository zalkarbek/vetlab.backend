const Service = require('./service');
const db = Service.getInject('db');

class NapravlenieService extends Service {
  constructor(params) {
    super(params);
    this.relations = {
      includeWithAll: [
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
        },
        {
          model: db.isledovanie,
          as: 'isledovanies'
        }
      ],
      includePub: [
        {
          model: db.posMaterial,
          attributes: {
            exclude: ['ownerJSON', 'kemOtobranJSON']
          },
          include: [
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.napravlenie,
          as: 'napravlenie'
        },
      ],
      includeEpic: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMera
            }
          ]
        },
      ]
    };
  }
  // ========================= REFERENCE ================================//
  async getLastNomerByOtdelId(napravlenOtdelId) {
    return db[this.modelName].findOne({
      where: { napravlenOtdelId }
      ,limit: 1
      ,order: [
        ['nomer', 'DESC']
      ]
    });
  }

  async createVnytNapravlenie({ posMaterials = [], ...otherData }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const newNap =  await db.vnytNapravlenie.create(otherData, {
      ...safeOptions,
    });
    const posMaterialIds = [];
    posMaterials.forEach((pos) => {
      posMaterialIds.push(pos.id);
    });
    await newNap.addPosMaterials(posMaterialIds);
    return newNap;
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
      include: [
        ...this.relations.includeWithAll,
        ...this.relations.includePub
      ],
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
      include: [
        ...this.relations.includeWithAll,
        ...this.relations.includePub
      ],
    });
  }

  async getAllVnytNapravlenieRel(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.findAll({
      ...safeOptions,
      include: [
        ...this.relations.includeWithAll,
        ...this.relations.includePub
      ],
    });
  }

  async getAllEpicRelPaginate(
    { page, pageSize, search, searchColumn, searchPosition = 'substring', where = {} },
    options = {}
    ) {
    const safeOptions = await this.safeOptions(options);
    const safeWhere = await this.safeWhere(where);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db.vnytNapravlenie.findAndCountAll({
      ...safeOptions
      , ...paginate
      ,where: {
        ...searchWhere,
        ...safeWhere
      }
      ,include: [
        ...this.relations.includeWithAll,
        ...this.relations.includeEpic
      ]
      ,order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllPubRelPaginate(
    { page, pageSize, search, searchColumn, searchPosition = 'substring', where = {} },
    options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    const safeWhere = await this.safeWhere(where);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db.vnytNapravlenie.findAndCountAll({
      ...safeOptions
      , ...paginate
      ,where: {
        ...searchWhere,
        ...safeWhere
      }
      ,include: [
        ...this.relations.includeWithAll,
        ...this.relations.includePub
      ]
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
