const Service = require('./service');
const db = Service.getInject('db');

class IsledovanieService extends Service {
  // ========================= REFERENCE ================================//
  constructor(params) {
    super(params);
    this.relations = {
      includeWithAll: [
        {
          model: db.otdel,
          include: [
            {
              model: db.sOtdelenia,
              as: 'sOtdelenia'
            }
          ]
        },
        {
          model: db.subOtdel,
        },
        {
          model: db.personal,
        },
      ],
      includePub: [
        {
          model: db.vnytNapravlenie,
          include: [
            {
              model: db.posMaterial,
              include: [
                {
                  model: db.sMera
                }
              ]
            },
          ]
        },
      ],
      includeEpic: [
        {
          model: db.vnytNapravlenie,
          include: [
            {
              model: db.posMaterial,
              include: [
                {
                  model: db.sMera
                }
              ]
            },
          ]
        },
      ],
      includeFinished: [
        {
          model: db.otdel,
          as: 'finishedOtdel',
          include: [
            {
              model: db.sOtdelenia,
              as: 'sOtdelenia'
            }
          ]
        },
        {
          model: db.subOtdel,
          as: 'finishedSubOtdel',
        },
        {
          model: db.personal,
          as: 'finishedPersonal',
        },
      ]
    };
  }

  async getById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(id, {
      ...safeOptions
      , include: [
        ...this.relations.includeWithAll
        ,...this.relations.includePub
        ,...this.relations.includeFinished
      ]
    });
  }

  async getAll(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions
      , include: [
        ...this.relations.includeWithAll
        ,...this.relations.includePub
        ,...this.relations.includeFinished
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      , include: [
        ...this.relations.includeWithAll
        ,...this.relations.includePub
        ,...this.relations.includeFinished
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllPaginateWithSearch(
    { page, pageSize, search, searchColumn, searchPosition = 'substring' },
    options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      ,...paginate
      ,where: {
        ...searchWhere
      }
      ,include: [
        ...this.relations.includeWithAll
        ,...this.relations.includePub
        ,...this.relations.includeFinished
      ]
      ,order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async startIsledovanie(
    {
      vnytNapravlenieId,
      napravlenieId,
      metodJSON,
      opPokazatelJSON,
      personalId,
      otdelId,
      subOtdelId
    },
    options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create({
      vnytNapravlenieId,
      isOtdelId: otdelId,
      isSubOtdelId: subOtdelId,
      isPersonalId: personalId,
      opPokazatelJSON: opPokazatelJSON,
      metodJSON: metodJSON,
      status: 'research',
      dateStart: new Date()
    }, { ...safeOptions });
  }

  async finishIsledovanie(
    { id,
      vnytNapravlenieId,
      isResult,
      personalId,
      otdelId,
      subOtdelId
    }
    , options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update({
      isResultJSON: isResult,
      finishedOtdelId: otdelId,
      finishedSubOtdelId: subOtdelId,
      finishedPersonalId: personalId,
      status:'finish',
      dateFinish: new Date()
    }, {
      ...safeOptions,
      where: { id }
    });
  }
}

module.exports = new IsledovanieService({ modelName: 'isledovanie' });
