const Controller = require('../controller');
const otdelService = Controller.getService('otdel');
const restDataName = 'otdel';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async getWithOtdelenia(req, res) {
    const { id } = otdelService.getObjectOneOfTwo(req.query, req.body);
    const result = await otdelService.getWithOtdelenia(id);
    return res.json(result);
  }
}

module.exports = new BaseController({ restDataName });
