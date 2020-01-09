
const { Controller } = require('../controller');
const userService = require('../../service/userService');

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
}

module.exports = new UserController();
module.exports.UserController = UserController;
