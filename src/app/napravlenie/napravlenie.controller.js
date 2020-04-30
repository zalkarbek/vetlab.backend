const Controller = require('../controller');
const restDataName = 'napravlenie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  create(req, res) {
    return res.json({ message: 'hello' });
  }
}

module.exports = new BaseController({ restDataName });
