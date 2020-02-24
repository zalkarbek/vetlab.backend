const Service = require('./service');
const db = Service.getInject('db');

class UserService extends Service {

  async getUserByEmail(email, options) {
    return db.user.findOne({
      where: { email },
      ...options
    });
  }

  async getUserByEmailWithRole(email, options) {
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
    return db.user.findByPk(id, { ...options });
  }

  async getUserRoles(options) {
    return db.roles.findAll(options);
  }

  /**
   * Проверка входит ли роли пользователя к определенным ролям списке
   * Возвращает колучиство сопадениий с ролями
  */
  async checkAccessRole(userRoles, checkRoles) {
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
