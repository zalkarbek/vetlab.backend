const Service = require('./service');
const db = Service.getInject('db');

class RoleService extends Service {
  constructor() {
    super();
  }

  // ========================= REFERENCE ================================//

  async getRoles(options = {}) {
    return db.role.findAll(options);
  }

  async getRoleById(id, options = {}) {
    return db.role.findByPk(id, options);
  }

  async getUsersToRole(roleId) {
    const safeAttributesUser = await this.safeAttributesForUser();
    const role = await this.getRoleById(roleId);
    return role.getUsers({ ...safeAttributesUser });
  }

  async addUsersToRole(roleId, users) {
    const role = await this.getRoleById(roleId);
    if ( !role) return null;
    return role.addUsers(users);
  }

}

module.exports = new RoleService();
