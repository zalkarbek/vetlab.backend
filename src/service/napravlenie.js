const Service = require('./service');
const posMaterialService = require('./posMaterial');
const asyncForEach = Service.getHelper('asyncForEach');
const db = Service.getInject('db');

class NapravlenieService extends Service {
  // ========================= REFERENCE ================================//

  async getLastNomerByOtdelId(otdelId) {
    return db[this.modelName].findOne({
      where: { otdelId }
      ,limit: 1
      ,order: [
        ['nomer', 'DESC']
      ]
    });
  }

  async getById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findByPk(id, {
      ...safeOptions,
      include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.otdel,
          as: 'otdel'
        }
      ]
    });
  }

  async getAllWithPosMaterial(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      include: [
        {
          model: db.posMaterial,
          order: [
            ['createdAt', 'DESC']
          ],
          include: [
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.otdel,
          as: 'otdel'
        }
      ],
      ...safeOptions,
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllWithPosMaterialWithPaginate(
    {
      page,
      pageSize,
      search,
      searchColumn,
      searchPosition = 'substring',
      where = {}
    },
    options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    const safeWhere = await this.safeWhere(where);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      ,where: {
        ...searchWhere,
        ...safeWhere
      }
      ,include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.otdel,
          as: 'otdel'
        }
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async getAllWithPosMaterialWithPaginateAndVnyt(
    {
      page,
      pageSize,
      search,
      searchColumn,
      searchPosition = 'substring',
      where = {}
    },
    options = {}
  ) {
    const safeOptions = await this.safeOptions(options);
    const safeWhere = await this.safeWhere(where);
    const paginate = await this.getPaginateAttrs({ page, pageSize });
    const searchWhere = await this.setSearchOptions({ searchColumn, search, searchPosition });

    return db[this.modelName].findAndCountAll({
      ...safeOptions
      , ...paginate
      ,where: {
        ...searchWhere,
        ...safeWhere
      }
      ,include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMera
            }
          ]
        },
        {
          model: db.vnytNapravlenie,
          include: [
            {
              model: db.otdel,
              as: 'napravlenOtdel'
            }
          ]
        },
        {
          model: db.otdel,
          as: 'otdel'
        }
      ]
      , order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async createNapravlenie(napravlenie, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create(napravlenie, { ...safeOptions });
  }

  async updateNapravlenie({ id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async createNapravlenieWithPosMaterial(napravlenie, posMaterials) {
    let transaction;
    try {
      transaction = await db.vetdb.transaction();
      const direction = await this.createNapravlenie(napravlenie, { transaction });
      if(direction && direction.id) {
        if(posMaterials && posMaterials.length >= 1) {
          const updatedMaterials = posMaterials.map((material) => {
            material.napravlenieId = direction.id;
            return material;
          });
          await posMaterialService.createMaterialsBulk(updatedMaterials, { transaction });
          await transaction.commit();
          return direction;
        } else {
          await transaction.rollback();
        }
      }
      await transaction.rollback();
      return null;
    }catch (e) {
      console.error(e);
      if (transaction) await transaction.rollback();
      return false;
    }
  }

  async updateNapravlenieWithPosMaterial(napravlenie, posMaterials) {
    let transaction;
    try {
      transaction = await db.vetdb.transaction();
      const direction = await this.updateNapravlenie(napravlenie, { transaction });
      if(posMaterials && posMaterials.length >= 1) {
        await asyncForEach(posMaterials, async (material) => {
          await posMaterialService.updatePosMaterial(material, { transaction });
        });
        await transaction.commit();
        return direction;
      } else {
        await transaction.rollback();
      }
      await transaction.rollback();
      return null;
    }catch (e) {
      console.error(e);
      if (transaction) await transaction.rollback();
      return false;
    }
  }

  async updateNapravlenieStatus(id, status, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update({ status }, {
      where: { id },
      ...safeOptions
    });
  }

  async destroyById(id) {
    await posMaterialService.removesByNapravlenieId(id);
    return db[this.modelName].destroy({
      where: { id }
    });
  }
}

module.exports = new NapravlenieService({ modelName: 'napravlenie' });
