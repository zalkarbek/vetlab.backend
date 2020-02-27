
const Controller = require('../controller');
const userService = Controller.getService('user');
const rest = Controller.getHelper('rest');

class UserController extends Controller {
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
    const data = req.body;
    const newUser = await userService.createUser(data);

  }

  async update(req, res) {

  }

  async destroy(req, res) {

  }


}

module.exports = new UserController();
