
const Controller = require('../controller');
const userService = Controller.getService('user');
const authService = Controller.getService('auth');
const rest = Controller.getHelper('rest');

class UserController extends Controller {
  constructor() {
    super();
    this.modelName = 'user';
    this.i18nUnitOne = 'user.one';
    this.i18nUnitMany = 'user.many';
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

  async create(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    const token = await authService.userGetToken(user);

    return res.json(rest.responseWith({
      unit:  this.i18nUnitOne,
      message: 'create.success.one',
      data: {
        user,
        token
      }
    }));
  }

  async update(req, res) {

  }

  async destroy(req, res) {

  }


}

module.exports = new UserController();
