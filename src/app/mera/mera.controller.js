const Controller = require('../controller');
const restDataName = 's_mera';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
