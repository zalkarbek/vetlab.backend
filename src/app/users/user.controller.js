
const { Controller } = require('../controller');

class UserController extends Controller {

  async getUserProfile(req, res) {
    const userService = Controller.getInject('service').getService('user');
    const { email } = req.payload;
    const user = await userService.getUserByEmail(email, {
      attributes: { exclude: ['password', 'remember_token'] }
    });

    return res.json({
      error: false,
      user,
    });
  }
}

module.exports = new UserController();
module.exports.UserController = UserController;
