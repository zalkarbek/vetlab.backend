const Controller = require('../controller');
const personalService = Controller.getService('personal');
const rest = Controller.getHelper('rest');
const restDataName = 'personal';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    const attributes = req.query.attributes || req.body.attributes;
    const options = req.body.options || req.query.options || {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const regions = await personalService.getAllPersonalWithUser(options);
    res.json(regions);
  }

  async allPaginate(req, res) {
    const page = req.query.page || req.body.page || 1;
    const pageSize = req.query.pageSize || req.body.pageSize || 10;
    const attributes = req.query.attributes || req.body.attributes;
    const options = req.query.options || req.body.options  || {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const regions = await personalService.getAllPersonalWithUserPaginate({ page, pageSize }, options);
    res.json(regions);
  }

  async getPersonalWithUser(req, res) {
    const id = req.params.id || req.query.id || req.body.id;
    const personal = await personalService.getPersonalWithUser(id);
    return res.json(personal);
  }

  async create(req, res) {
    const { user, ...personalData } = req.body;
    const newPersonal = await personalService.createPersonalWithUser({
      user,
      personal: personalData
    });

    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'create.success.one',
      data: newPersonal
    }));
  }

  async update(req, res) {
    const { user, ...personalData } = req.body;
    const updatedPersonal = await personalService.updatePersonalWithUser({ user, personal: personalData });
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'update.success.one',
      data: updatedPersonal
    }));
  }

  async changePassword(req, res) {
    const { personalId, user } = req.body;
    const changed = await personalService.changePassword({ user, personalId });
    return res.json(rest.responseWith({
      unit: 'user.password',
      message: 'update.success.one',
      data: changed
    }));
  }
}

module.exports = new BaseController({ restDataName });
