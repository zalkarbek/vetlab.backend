const Controller = require('../controller');
const restDataName = 'subOtdel';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
