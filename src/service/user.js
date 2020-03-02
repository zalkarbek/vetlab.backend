const Service = require('./service');
const helpers = require('../helpers');
const db = Service.getInject('db');
const crypter = helpers.getHelper('crypter');
const roleService = require('./role');

class UserService extends Service {
  constructor() {
    super();
  }

  async _findByPk(id) {
    return db.user.findByPk(id);
  }

  // при получении пользователей удаляем поля password и tokenId для скрытья полей
  async safeAttributes({ attributes = {} } = {}) {
    let { exclude = ['password', 'tokenId'], include = [] }  = attributes;
    let safe = { exclude };

    if (include.length >= 1) {
      include = include.filter(value => value !== 'password' && value !== 'tokenId');
      safe = {
        include
      };
    }

    if (exclude.length >= 1) {
      safe = {
        exclude: [ 'password', 'tokenId', ...exclude ],
      };
    }

    return { attributes: safe };
  }

  // при обновлении пользователя убираем поле password и tokeId для безопасности
  async safeFields({ fields = [] } = {}) {
    const fd = fields.filter(value => value !== 'password' && value !== 'tokenId');
    return { fields: fd };
  }

  async getUsers(options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });

    return db.user.findAll({
      ...safeAttrs
      , ...other
    });
  }

  async getUsersPaginate({ page, pageSize }, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });
    const paginate = await this.paginate({ page, pageSize });

    return db.user.findAndCountAll({
      ...safeAttrs
      , ...other
      , ...paginate
    });
  }

  async getUsersWithRoles(options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });

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
    });
  }

  async getUsersWithPersonal(options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });

    return db.user.findAll({
      include: [
        {
          model: db.personal,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      ...safeAttrs
      , ...other
    });
  }

  async getUserById(id, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });

    return db.user.findByPk(id, {
      ...safeAttrs
      , ...other
    });
  }

  async getUserByEmail(email, options = {}) {
    const { attributes, ...other } = options;
    const safeAttrs = await this.safeAttributes({ attributes });

    return db.user.findOne({
      where: { email },
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

  async createUser({ name, email, password } = {}) {
    const { password_hashed } = await crypter.hashPwd(password);
    const newUser = db.user.build({
      name,
      email,
      password: password_hashed
    });

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

  async destroyUserById(id) {
    return db.user.destroy({
      where: { id }
    });
  }

  async getRolesToUser(userId) {
    const user = await this.getUserById(userId);
    return user.getRoles();
  }

  async addRolesToUser(userId, roles) {
    const user = await this.getUserById(userId);
    if ( !user) return null;
    return user.addRoles(roles);
  }

  async removeRolesToUser(userId, roles) {
    const user = await this.getUserById(userId);
    if (!user) return null;
    return user.removeRoles(roles);
  }
}

module.exports = new UserService();
