const Service = require('./service');
const posMaterialService = require('./posMaterial');
const db = Service.getInject('db');

class NapravlenieService extends Service {
  // ========================= REFERENCE ================================//
  async createNapravlenie(napravlenie, options) {
    const safeOptions = await this.safeOptions(options);
    console.log(safeOptions);
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
}

module.exports = new NapravlenieService({ modelName: 'napravlenie' });
