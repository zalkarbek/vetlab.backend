const { Service } = require('./service');

class UserService extends Service {

  async getUserByEmail(email, options) {
    return this.db.user.findOne({
      where: { email },
      ...options
    });
  }

  async getUserByEmailWithRole(email, options) {
    return this.db.user.findOne({
      where: { email },
      include: [
        {
          model: this.db.roles,
          attributes: ['role_i18n', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 }
        }
      ],
      ...options
    });
  }

  async getUserById(id, options) {
    return this.db.user.findByPk(id, { ...options });
  }

  async getUserRoles(options) {
    return this.db.roles.findAll(options);
  }

  async checkAccessRole(userRoles, checkRoles) {
    if(userRoles.length === 0) return 0;
    let accessCount = 0;
    const maxRole = this._.maxBy(userRoles, 'priority');
    const roles = await this.getUserRoles({
      where: {
        role_key: {
          [this.Op.in]: checkRoles
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

}

module.exports = new UserService();
module.exports.UserService = UserService;
