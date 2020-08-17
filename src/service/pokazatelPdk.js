const Service = require('./service');
const db = Service.getInject('db');
const materialService = require('./material');

class PokazatelService extends Service {
  // ========================= REFERENCE ================================//

  constructor(params) {
    super(params);

    this.relations = {
      includeWithAll: [
        {
          model: db.sPokazatel,
          as: 'sPokazatel'
        }
      ]
    };
  }

  async getAllAdmin(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions
      , include: [
        {
          model: db.sPokazatel,
          as: 'sPokazatel',
        }
      ]
      ,order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAll(options = {}, sOtdeleniaId = null) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions
      , include: [
        {
          model: db.sPokazatel,
          as: 'sPokazatel',
          where: {
            [db.Op.or]: [
              {
                sOtdeleniaId: {
                  [db.Op.eq]: sOtdeleniaId
                }
              },
              {
                sOtdeleniaId: {
                  [db.Op.is]: null
                }
              }
            ]
          }
        }
      ]
      ,order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllPaginateAdmin({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      , include: [
        {
          model: db.sPokazatel,
          as: 'sPokazatel',
        }
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}, sOtdeleniaId) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      , include: [
        {
          model: db.sPokazatel,
          as: 'sPokazatel',
          where: {
            [db.Op.or]: [
              {
                sOtdeleniaId: {
                  [db.Op.eq]: sOtdeleniaId
                }
              },
              {
                sOtdeleniaId: {
                  [db.Op.is]: null
                }
              }
            ]
          }
        }
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getByPokazatelAndMaterial(pokazatelId, materialId) {
    const material = await materialService.getById(materialId);
    if (material) {
      const sMaterialTypes = material.sMaterialTypeId ? [material.sMaterialTypeId] : [];
      const sMaterialAnimalTypes = material.sMaterialAnimalTypeId ? [material.sMaterialAnimalTypeId] : [];
      const query = db.QUERY.GET_PDK_BY_POKAZATEL_ID_AND_MATERIAL(Number(pokazatelId), sMaterialTypes, sMaterialAnimalTypes);
      return db.vetdb.query(query.Q,  { replacements: query.REPLACE, type: db.vetdb.QueryTypes.SELECT });
    }
    return [];
  }

  async create(data = {}) {
    return db[this.modelName].create(data);
  }

  async updateById({ id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async destroyById(id) {
    return db[this.modelName].destroy({
      where: { id }
    });
  }

  async search({
    page, pageSize,  search, searchColumn, searchPosition = 'substring', ...options
  }) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    let where = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db[this.modelName].findAndCountAll({
      where,
      ...safeOptions
      , ...paginate
      , include: [
        ...this.relations.includeWithAll
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

}

module.exports = new PokazatelService({ modelName: 'sPokazatelPdk' });
