const Controller = require('../controller');
const refService = Controller.getService('ref');
const roleService = Controller.getService('role');
const rest = Controller.getHelper('rest');
const restDataName = 'roles';
const modelName = 'role';
const i18nUnitOne = 'role.one';
const i18nUnitMany = 'role.many';

class RolesController extends Controller {
  constructor(params) {
    super(params);
  }

  async id(req, res) {
    const { id } = req.params;
    const unit = await refService.getById(modelName, id);
    return res.json(unit);
  }

  async all(req, res) {
    const lists = await refService.getAll(modelName);
    console.log('all');
    res.json(lists);
  }

  async create(req, res) {
    const data = req.body;
    const created = await refService.create(modelName, data);

    return res.json(rest.responseWith({
      unit:  this.i18nUnitOne,
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body;
    const updated = await refService.updateById(modelName, data);

    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroy(req, res) {
    const { id } = req.body;
    const deleted = await refService.destroyById(modelName, id);
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
