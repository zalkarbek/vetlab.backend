const Controller = require('../controller');
const userService = Controller.getService('user');
const personalService = Controller.getService('personal');
const rest = Controller.getHelper('rest');
const restDataName = 'personal';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async create(req, res) {
    const { user, ...personalData } = req.body.user;
    const newUser = userService.createUser(user);
    const newPersonal = personalService.createPersonal();

    return res.json({
      message: 'hello'
    });
    // return super.create(req, res);
  }
}

module.exports = new BaseController({ restDataName });
