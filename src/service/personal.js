
const Service = require('./service');
const db = Service.getInject('db');

class PersonalService extends Service {
  async getPersonalByUserId(userId) {
    return db.personal.findOne({
      where : {
        userId: userId
      }
    });
  }
}

module.exports = new PersonalService();
