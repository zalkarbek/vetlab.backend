const Service = require('./service');
const posMaterialService = require('./posMaterial');
const asyncForEach = Service.getHelper('asyncForEach');
const db = Service.getInject('db');

class NapravlenieService extends Service {
  // ========================= REFERENCE ================================//

  async getAllWithPosMaterial(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].findAll({
      include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMaterial
            }
          ]
          // where: { isArchive: 0 }
        }
      ],
      ...safeOptions
    });
  }

  async getAllWithPosMaterialWithPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db[this.modelName].findAndCountAll({
      include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMaterial
            }
          ]
        }
      ],
      ...safeOptions
      , ...paginate
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

  async createVnytNapravlenie(data, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.create(data, { ...safeOptions });
  }

  async updateNapravlenieStatus(id, status, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].update({ status }, {
      where: { id },
      ...safeOptions
    });
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
      include: [
        {
          model: db.posMaterial,
          include: [
            {
              model: db.sMaterial
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
      ],
    });
  }

  async getAllVnytNapravlenieRelPaginate({ page, pageSize }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db.vnytNapravlenie.findAndCountAll({
      ...safeOptions
      , ...paginate,
      include: [
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
    });
  }
}

module.exports = new NapravlenieService({ modelName: 'napravlenie' });
