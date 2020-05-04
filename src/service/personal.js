const Service = require('./service');
const userService = require('./user');
const db = Service.getInject('db');

class PersonalService extends Service {
  async getPersonalByUserId(userId) {
    return db.personal.findOne({
      where : {
        userId: userId
      }
    });
  }

  async createPersonal(data, options = {}) {
    return db.personal.create(data, options);
  }

  async createPersonalWithUser({ user, personal }) {
    const transaction = await db.vetdb.transaction();
    try {
      const newUser = await userService.createUser(user, { transaction });
      if (newUser && newUser.id) {
        personal.userId = newUser.id;
        const newPersonal = await this.createPersonal(personal, { transaction });
        transaction.commit();
        return newPersonal;
      }
      transaction.rollback();
      return new Error('Personal Not Saved');
    } catch (e) {
      transaction.rollback();
      throw e;
    }
  }
}

module.exports = new PersonalService();
