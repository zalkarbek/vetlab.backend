
const db = require('../../db/models/index');

class UserController {

  async getUserProfile(req, res) {

    const { email } = req.payload;
    const user = await db.User.findOne({
      where: {
        email
      },
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
