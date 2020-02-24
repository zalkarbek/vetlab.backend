
const Controller = require('../controller');
const personalService = Controller.getService('personal');

class PersonalController extends Controller {
  async getPersonalProfile(req, res) {
    const { userId } = req.payload;
    const personal = await personalService.getPersonalByUserId(userId);

    return res.json(personal);
  }
}

module.exports = new PersonalController();
