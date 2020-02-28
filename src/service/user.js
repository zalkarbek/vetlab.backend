const Service = require('./service');
const helpers = require('../helpers');
const db = Service.getInject('db');
const crypter = helpers.getHelper('crypter');

class UserService extends Service {
  constructor() {
    super();
    this.user_public_fields = db.FIELDS.USER_PUBLIC;
  }

  async _findByPk(id) {
    return db.user.findByPk(id);
  }

  // при получении пользователей удаляем поля password и tokenId для скрытья полей
  async safeAttributes({ attributes = {}, ...otherOptions }) {
    let { exclude = ['password', 'tokenId'], include = [] }  = attributes;
    let filteredAttributes = {
      exclude
    };

    if(include.length >= 1) {
      include = include.filter(value => value !== 'password' && value !== 'tokenId');
      filteredAttributes = {
        include
      };
    }

    if (exclude.length >= 1) {
      filteredAttributes = {
        exclude: [ 'password', 'tokenId', ...exclude ],
      };
    }

    return { attributes: filteredAttributes, ...otherOptions };
  }

  // при обновлении пользователя убираем поле password и tokeId для безопасности
  safeFields({ fields = [], ...otherOptions }) {
    const filtered = fields.filter(value => value !== 'password' && value !== 'tokenId');
    return { fields: filtered, ...otherOptions };
  }

  async getUsers(options = {}) {
    const filteredOptions = await this.safeAttributes(options);
    return db.user.findAll(filteredOptions);
  }

  async getUserById(id, options = {}) {
    const filteredOptions = await this.safeAttributes(options);
    return db.user.findByPk(id, filteredOptions);
  }

  async getUserByEmail(email, options = {}) {
    const filteredOptions = await this.safeAttributes(options);
    return db.user.findOne({
      where: { email },
      ...filteredOptions
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

  async getRoles(options) {
    return db.role.findAll(options);
  }

  /**
   * Проверка входит ли роли пользователя к определенным ролям списке
   * Возвращает колучиство сопадениий с ролями
  */
  async checkAccessRole(userRoles, checkRoles) {
    const Op = db.Sequelize.Op;

    if(userRoles.length === 0) return 0;
    const maxRole = this._.maxBy(userRoles, 'priority');
    const roles = await this.getRoles({
      where: {
        role_key: {
          [Op.in]: checkRoles
        }
      }
    });
    let accessCount = 0;

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
    const filteredOptions = this.safeFields(options);

    return db.user.update(data, {
      where: { id },
      ...filteredOptions
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
