
const Controller = require('../controller');
const userService = Controller.getService('user');
const authService = Controller.getService('auth');
const rest = Controller.getHelper('rest');

const i18nUnitOne = 'user.one';

class UserController extends Controller {
  constructor() {
    super();
  }

  async getUserProfile(req, res) {
    const { email } = req.payload;
    const user = await userService.getUserByEmail(email, {
      attributes: { exclude: ['password', 'remember_token'] }
    });

    return res.json({
      error: false,
      user,
    });
  }

  async all(req, res) {
    const users = await userService.getUsers();
    res.json(users);
  }

  async id(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.json(user);
  }

  async create(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    const token = await authService.userGetToken(user);

    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'create.success.one',
      data: {
        user,
        token
      }
    }));
  }

  async update(req, res) {
    const data = req.body;
    data.id = data.id || req.params.id;
    const updated = await userService.updateUserById(data);

    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroy(req, res) {
    const id = req.body.id || req.params.id;
    const deleted = await userService.destroyUserById(id);

    return res.json(rest.responseWith({
      unit: i18nUnitOne,
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  async getRoles(req, res) {
    const id = req.body.id || req.params.id;
    const roles = await userService.getRolesToUser(id);
    return res.json(roles);
  }

  async addRoles(req, res) {
    const id = req.body.id || req.params.id;
    const roles = req.body.roles;
    const added = await userService.addRolesToUser(id, roles);
    return res.json(rest.responseWith({
      unit: 'roles.many',
      message: 'add.success.many',
      data: added
    }));
  }

  async removeRoles(req, res) {
    const id = req.body.id || req.params.id;
    const roles = req.body.roles;
    const removed = await userService.removeRolesToUser(id, roles);
    return res.json(rest.responseWith({
      unit: 'roles.many',
      message: 'remove.success.many',
      data: removed
    }));
  }
}

module.exports = new UserController();
