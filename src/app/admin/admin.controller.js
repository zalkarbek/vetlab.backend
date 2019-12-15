
const adminModel = require('../../db/models/admin');

class AdminController {

  async getAdminProfile(req, res) {

    const { login } = req.payload;

    const admin = await adminModel.findOne({ login }, 'login email name').exec();
    return res.json({
      error: false,
      profile: admin,
    });
  }
}

module.exports = new AdminController();
module.exports.AdminController = AdminController;