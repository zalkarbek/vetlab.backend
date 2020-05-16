const Service = require('./service');
const db = Service.getInject('db');

class RoleService extends Service {
  // ========================= REFERENCE ================================//

  async getRoles(options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.role.findAll({
      ...safeOptions,
      where: {
        priority: {
          [db.Op.lt]: 770
        }
      }
    });
  }

  async createRole(data, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.role.create(data, {
      ...safeOptions
    });
  }

  async updateRole({ id, ...data }, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.role.update(data, {
      where: { id },
      ...safeOptions
    });
  }

  async destroyRoleById(id) {
    return db.role.destroy({
      where: { id }
    });
  }

  async getRoleById(id, options = {}) {
    const safeOptions = await this.safeOptions(options);
    return db.role.findByPk(id, { ...safeOptions });
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

module.exports = new RoleService({ modelName: 'role' });
