
const Controller = require('../controller');
const userService = Controller.getService('user');

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

  createUser(req, res) {
    const data = req.body;

  }
}

module.exports = new UserController();
