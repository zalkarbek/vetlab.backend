const Controller = require('../controller');
const refService = Controller.getService('ref');

class MeraController extends Controller {
  // Авторизация пользователей
  async create(req, res) {
    const data = req.data;
    const unit = await refService.createMera(data);
    return res.json(unit);
  }

  async update(req, res) {
    const data = req.data;
    const unit = await refService.updateMera(data);
    return res.json(unit);
  }
}

module.exports = new MeraController();
