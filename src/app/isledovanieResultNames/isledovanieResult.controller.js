const Controller = require('../controller');
const restDataName = 'isledovanie_result_names';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
