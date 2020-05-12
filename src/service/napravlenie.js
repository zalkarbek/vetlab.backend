const Service = require('./service');
const posMaterialService = require('./posMaterial');
const db = Service.getInject('db');

class NapravlenieService extends Service {
  // ========================= REFERENCE ================================//

  async getAllWithPosMaterial(options) {
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

  async createNapravlenie(napravlenie, options) {
    const safeOptions = await this.safeOptions(options);
    return db[this.modelName].create(napravlenie, { ...safeOptions });
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

  async createVnytNapravlenie(data, options) {
    const safeOptions = await this.safeOptions(options);
    return db.vnytNapravlenie.create(data, { ...safeOptions });
  }
}

module.exports = new NapravlenieService({ modelName: 'napravlenie' });
