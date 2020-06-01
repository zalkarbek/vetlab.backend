const Service = require('./service');
const db = Service.getInject('db');

class IsledovanieService extends Service {
  // ========================= REFERENCE ================================//
  async startIsledovanie(
    {
      vnytNapravlenieId,
      napravlenieId,
      metodIdJSON,
      opPokazatelIdJSON,
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
      opPokazatelIdJSON: opPokazatelIdJSON,
      metodIdJSON: metodIdJSON,
      status: 'research'
    }, { ...safeOptions });
  }

  async getById(id) {
    return db[this.modelName].findByPk(id);
  }

  async getIsledovanieWithVnytNapravlenie(id) {
    return db[this.modelName].findByPk(id, {
      include: [
        {
          model: db.vnytNapravlenie,
        }
      ]
    });
  }
}

module.exports = new IsledovanieService({ modelName: 'isledovanie' });
