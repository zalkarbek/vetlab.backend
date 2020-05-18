const Service = require('./service');
const userService = require('./user');
const refService = require('./ref');
const db = Service.getInject('db');

class PersonalService extends Service {
  async getPersonalByUserId(userId) {
    return db.personal.findOne({
      where : {
        userId: userId
      }
    });
  }

  async getPersonalByUser(user) {
    return this.getPersonalByUserId(user.id);
  }

  async getPersonalById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.personal.findByPk(id, { ...safeOptions });
  }

  async getAllPersonalWithUser(options = {}) {
    const userAttrsSafe = await this.safeAttributesForUser();
    const updatedOptions = {
      include: [
        {
          model: db.user,
          ...userAttrsSafe
        }
      ],
      ...options
    };
    return refService.getAll(this.modelName, updatedOptions);
  }

  async getAllPersonalWithUserPaginate({ page, pageSize }, options = {}) {
    const userAttrsSafe = await this.safeAttributesForUser();
    const updatedOptions = {
      include: [
        {
          model: db.user,
          ...userAttrsSafe
        }
      ],
      ...options
    };
    return refService.getAllPaginate(this.modelName, { page, pageSize }, updatedOptions);
  }

  async getPersonalWithUser(id) {
    const safeAttrs = await this.safeAttributesForUser();
    return db.personal.findOne({
      where: { id },
      include: [
        {
          model: db.user,
          ...safeAttrs,
          include: {
            model: db.role,
            through: 'roles'
          }
        }
      ]
    });
  }

  async createPersonal(data, options = {}) {
    return db.personal.create(data, options);
  }

  async updatePersonal({ id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.personal.update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async createPersonalWithUser({ user, personal }) {
    let transaction;
    try {
      transaction = await db.vetdb.transaction();
      const newUser = await userService.createUser(user, { transaction });
      if (newUser && newUser.id) {
        personal.userId = newUser.id;
        await userService.addRolesToUser(newUser.id, newUser.roles);
        const newPersonal = await this.createPersonal(personal, { transaction });
        await transaction.commit();
        return newPersonal;
      }
      await transaction.rollback();
      return new Error('Personal Not Saved');
    } catch (e) {
      if (transaction) await transaction.rollback();
      throw e;
    }
  }

  async updatePersonalWithUser({ user, roles, personal }) {
    let transaction;
    try {
      transaction = await db.vetdb.transaction();
      user.id = personal.userId;
      await userService.updateUserWithoutPassword(user, { transaction });
      await userService.updateRolesToUser(user, roles);
      const updatedPersonal = await this.updatePersonal(personal, { transaction });
      await transaction.commit();
      return updatedPersonal;
    } catch (e) {
      if (transaction) await transaction.rollback();
      throw e;
    }
  }

  async changePassword({ user, personalId }) {
    const personal = await this.getPersonalById(personalId);
    let changed = 0;
    if(Number(personal.userId) === Number(user.id)) {
      changed = await userService.changeUserPassword(user);
    }
    return changed;
  }
}

module.exports = new PersonalService({ modelName: 'personal' });
