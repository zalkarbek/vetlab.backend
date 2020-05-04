const Controller = require('../controller');
const personalService = Controller.getService('personal');
const rest = Controller.getHelper('rest');
const restDataName = 'personal';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async create(req, res) {
    const { user, ...personalData } = req.body;
    const newPersonal = await personalService.createPersonalWithUser({ user, personal: personalData });

    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'create.success.one',
      data: newPersonal
    }));
  }
}

module.exports = new BaseController({ restDataName });
