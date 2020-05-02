const Controller = require('../controller');
const restDataName = 'personal';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async create(req, res) {
    return super.create(req, res);
  }
}

module.exports = new BaseController({ restDataName });
