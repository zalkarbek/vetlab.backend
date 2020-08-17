const _ = require('lodash');
const Service = require('./service');
const helpers = require('../helpers');
const roleService = require('./role');

const db = Service.getInject('db');
const crypter = helpers.getHelper('crypter');
const asyncForEach = Service.getHelper('asyncForEach');

class UserService extends Service {
  constructor() {
    super();
  }

  async _findByPk(id) {
    return db.user.findByPk(id);
  }

  // при получении пользователей удаляем поля password и tokenId для скрытья полей
  // async safeAttributes({ attributes = {} } = {}) {}

  // при обновлении пользователя убираем поле password и tokeId для безопасности
  async safeFields({ fields = [] } = {}) {
    const fd = fields.filter(value => value !== 'password' && value !== 'tokenId');
    return { fields: fd };
  }

  async getUsers(options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });

    return db.user.findAll({
      ...safeAttrs
      , ...other
    });
  }

  async getUsersPaginate({ page = 1, pageSize = 10 }, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db.user.findAndCountAll({
      ...safeAttrs
      , ...other
      , ...paginate
    });
  }

  async getUsersWithRoles({ page = 1, pageSize = 10 }, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db.user.findAll({
      include: [
        {
          model: db.role,
          attributes: ['id', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 },
          through: {
            attributes: ['role_id', 'user_id']
          }
        }
      ],
      ...safeAttrs
      , ...other
      , ...paginate
    });
  }

  async getUsersWithPersonal({ page = 1, pageSize = 10 }, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });
    const paginate = await this.getPaginateAttrs({ page, pageSize });

    return db.user.findAll({
      include: [
        {
          model: db.personal
        }
      ],
      ...safeAttrs
      , ...other
      , ...paginate
    });
  }

  async getUserById(id, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });

    return db.user.findByPk(id, {
      ...safeAttrs
      , ...other
    });
  }

  async getUserByEmail(email, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });

    return db.user.findOne({
      where: { email },
      ...safeAttrs
      , ...other
    });
  }

  async getUserByEmailWithPersonalWithRole(email, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributesForUser({ attributes });

    return db.user.findOne({
      where: { email },
      include: [
        {
          model: db.role,
          attributes: ['role_i18n', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 }
        },
        {
          model: db.personal,
          include: [
            {
              model: db.otdel
            }
          ]
        }
      ],
      ...safeAttrs
      , ...other
    });
  }

  async getUserByEmailWithRole(email, options = {}) {
    return db.user.findOne({
      where: { email },
      include: [
        {
          model: db.role,
          attributes: ['role_i18n', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 }
        }
      ],
      ...options
    });
  }

  async isAdmin(userId, userRoles) {
    const adminRoles = ['admin', 'super', 'developer', 'vetAdmin'];
    if(!userRoles && !userRoles.length) {
      return false;
    }
    const finded = _.find(userRoles, (userRole) => {
      return adminRoles.find((adminRole) => adminRole === userRole.role_key);
    });

    return Boolean(finded);
  }

  /**
   * Проверка входит ли роли пользователя к определенным ролям списке
   * Возвращает колучиство сопадениий с ролями
  */
  async checkAccessRole(userRoles, checkRoles) {
    if (userRoles.length === 0) return 0;

    let accessCount = 0;
    const Op = db.Sequelize.Op;
    const maxRole = this._.maxBy(userRoles, 'priority');
    const roles = await roleService.getRoles({
      where: {
        role_key: {
          [Op.in]: checkRoles
        }
      }
    });

    roles.forEach((role) => {
      if(role && Number(role.priority) <= Number(maxRole.priority)) {
        accessCount = accessCount + 1;
      }
    });
    return accessCount;
  }

  async createUser({ name, email, password } = {}, options = {}) {
    const { password_hashed } = await crypter.hashPwd(password);
    const newUser = db.user.build({
      name,
      email,
      password: password_hashed
    }, options);
    await newUser.save();
    return newUser;
  }

  async updateUserById({ id, ...data }, options = {}) {
    delete data.password;
    delete data.tokenId;
    const { fields, ...other } = options;
    const safeFields = await this.safeFields({ fields });

    return db.user.update(data, {
      where: { id },
      ...safeFields
      , ...other
    });
  }

  async changeUserPassword({ id, email, password }, options = {}) {
    const { password_hashed } = await crypter.hashPwd(password);
    return db.user.update({ id, email, password: password_hashed }, {
      where: { id },
      ...options
    });
  }

  async updateUserWithoutPassword({ id, name, email } = {}, options = {}) {
    const safeOptions = this.safeOptionsCreateUpdate(options);
    return db.user.update({ id, name, email }, {
      where: { id },
      ...safeOptions
    });
  }

  async destroyUserById(id) {
    return db.user.destroy({
      where: { id }
    });
  }

  async getRolesToUser(userId) {
    const user = await this.getUserById(userId);
    return user.getRoles();
  }

  async addRolesToUser(userId, roles = []) {
    const user = await this.getUserById(userId);
    if ( !user) throw new Error('error.user.notFound');
    if(roles && Array.isArray(roles) && roles.length >= 1) {
      await asyncForEach(roles, async (role) => {
        await db.userInRoles.create({
          user_id: userId,
          role_id: role.id
        });
      });
      return true;
    }
    return false;
  }

  async updateRolesToUser({ id }, roles = []) {
    if(id) {
      await db.userInRoles.destroy({
        where: { user_id: id }
      });
      await asyncForEach(roles, async (role) => {
        await db.userInRoles.create({
          user_id: id,
          role_id: role.id
        });
      });
      return true;
    }
    return false;
  }

  async removeRolesToUser(userId) {
    if(userId) {
      return db.userInRoles.destroy({
        where: { user_id: userId }
      });
    }
    return false;
  }
}

module.exports = new UserService({ modelName: 'user' });
