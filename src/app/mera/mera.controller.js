const Controller = require('../controller');
const refService = Controller.getService('ref');

class MeraController extends Controller {
  async all(req, res) {
    const units = await refService.getAllMera();
    return res.json(units);
  }

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

  async destroy(req, res) {
    const { id } = req.data;
    const unit = await refService.destroyMera({ id });
    return res.json(unit);
  }
}

module.exports = new MeraController();
