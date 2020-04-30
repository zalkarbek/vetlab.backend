const Controller = require('../controller');
const restDataName = 'otdel';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }
}

module.exports = new BaseController({ restDataName });
