const Controller = require('../controller');
const restDataName = 'rmaterial_kit';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
