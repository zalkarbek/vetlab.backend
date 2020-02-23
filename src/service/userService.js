const { Service } = require('./service');

class UserService extends Service {

  async getUserByEmail(email, options) {
    const db = Service.getInject('db');

    return db.user.findOne({
      where: { email },
      ...options
    });
  }

  async getUserByEmailWithRole(email, options) {
    const db = Service.getInject('db');

    return db.user.findOne({
      where: { email },
      include: [
        {
          model: db.roles,
          attributes: ['role_i18n', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 }
        }
      ],
      ...options
    });
  }

  async getUserById(id, options) {
    const db = Service.getInject('db');
    return db.user.findByPk(id, { ...options });
  }

  async getUserRoles(options) {
    const db = Service.db;
    return db.roles.findAll(options);
  }

  /**
   * Проверка входит ли роли пользователя к определенным ролям списке
   * Возвращает колучиство сопадениий с ролями
  */
  async checkAccessRole(userRoles, checkRoles) {
    const db = Service.getInject('db');
    const Op = db.Sequelize.Op;

    if(userRoles.length === 0) return 0;
    const maxRole = this._.maxBy(userRoles, 'priority');
    const roles = await this.getUserRoles({
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

}

module.exports = new UserService();
module.exports.UserService = UserService;
