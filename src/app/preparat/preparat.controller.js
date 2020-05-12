const Controller = require('../controller');
const restDataName = 's_preparat';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
