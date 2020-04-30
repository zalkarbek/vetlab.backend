const Controller = require('../controller');
const restDataName = 'pos_material';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
