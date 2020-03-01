const Service = require('./service');
const userService = require('./user');
const db = Service.getInject('db');

class RoleService extends Service {
  constructor() {
    super();
  }

  // ========================= REFERENCE ================================//

  async getRoleById(id) {
    const filteredOptions = await this.safeAttributes(options);
    return db.role.findByPk(id, filteredOptions);
  }

  async getUsersToRole(roleId) {
    const safeOptionsForUser = userService.safeAttributes();
    const role = await this.getRoleById(roleId);
    return role.getUsers(safeOptionsForUser);
  }

  async addUsersToRole(roleId, users) {
    const role = await this.getRoleById(roleId);
    if ( !role) return null;
    return role.addUsers(users);
  }

}

module.exports = new RoleService();
