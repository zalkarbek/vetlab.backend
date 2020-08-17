const Service = require('./service');
const db = Service.getInject('db');

class PosMaterialService extends Service {
  // ========================= REFERENCE ================================//
  constructor(params) {
    super(params);
    this.relations = {
      includePub: [
        {
          model: db.napravlenie,
          attributes: {
            exclude: [
              'probyNapravilJSON',
              'probyDostavilJSON'
            ]
          },
        }
      ]
    };
  }

  async getLastNomerByOtdelId(otdelId) {
    return db[this.modelName].findOne({
      include: [
        {
          model: db.napravlenie,
          attributes: {
            exclude: [
              'probyNapravilJSON',
              'probyDostavilJSON'
            ]
          },
          where: {
            otdelId
          }
        }
      ]
      ,limit: 1
      ,order: [
        ['nomer', 'DESC']
      ]
    });
  }

  async getAll(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      ...safeOptions,
      limit: 500
    });
  }

  async getAllPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions({
      ...options,
    });
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
    });
  }

  async getAllPaginateExceptOwner({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions({
      ...options,
      attributes: {
        exclude: ['ownerJSON', 'kemOtobranJSON']
      }
    });
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
    });
  }

  async createMaterial(material, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create(material, { ...safeOptions });
  }

  async createMaterialsBulk(materials, options) {
    return db[this.modelName].bulkCreate(materials, options);
  }

  async updatePosMaterial({ id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async removesByNapravlenieId(napravlenieId) {
    return db[this.modelName].destroy({
      where: { napravlenieId }
    });
  }
}

module.exports = new PosMaterialService({ modelName: 'posMaterial' });
