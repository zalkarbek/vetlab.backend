const Controller = require('../controller');
const roleService = Controller.getService('role');
const rest = Controller.getHelper('rest');
const restDataName = 'roles';
const i18nUnitOne = 'role.one';

class RolesController extends Controller {
  constructor(params) {
    super(params);
  }

  async id(req, res) {
    const { id } = req.params;
    const unit = await roleService.getRoleById(id);
    return res.json(unit);
  }

  async all(req, res) {
    const lists = await roleService.getRoles();
    res.json(lists);
  }

  async create(req, res) {
    const data = req.body;
    const created = await roleService.createRole(data);
    return res.json(rest.responseWith({
      unit:  this.i18nUnitOne,
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body;
    const updated = await roleService.updateRole(data);
    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroy(req, res) {
    const { id } = req.body;
    const deleted = roleService.destroyRoleById(id);
    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  async getUsers(req, res) {
    const id = req.body.id || req.params.id;
    const users = await roleService.getUsersToRole(id);
    return res.json(users);
  }

  async addUsers(req, res) {
    const id = req.body.id || req.params.id;
    const users = req.body.users;
    const added = await roleService.addUsersToRole(id, users);
    return res.json(rest.responseWith({
      unit: 'users.many',
      message: 'add.success.many',
      data: added
    }));
  }
}

module.exports = new RolesController({ restDataName });
