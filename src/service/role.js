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

  async getUsersToRole(roleId, options = {}) {
    const safeOptions = await this.safeOptions(options);
    const role = await this.getRoleById(roleId);
    return role.getUsers({ ...safeOptions });
  }

  async addUsersToRole(roleId, users) {
    const role = await this.getRoleById(roleId);
    if ( !role) return null;
    return role.addUsers(users);
  }

}

module.exports = new RoleService();
