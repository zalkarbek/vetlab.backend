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
    const personal = await personalService.getAllPersonalWithUser(options);
    console.log(personal);
    res.json(personal);
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

  async getLaborantsByOtdelId(req, res) {
    const otdelId = req.params.otdelId || req.query.otdelId || req.body.otdelId;
    const personals = await personalService.getLaborantsByOtdelId(otdelId);
    return res.json(personals);
  }

  async getChemistsByOtdelId(req, res) {
    const otdelId = req.params.otdelId || req.query.otdelId || req.body.otdelId;
    const personals = await personalService.getChemistsByOtdelId(otdelId);
    return res.json(personals);
  }

  async getSeniorsByOtdelId(req, res) {
    const otdelId = req.params.otdelId || req.query.otdelId || req.body.otdelId;
    const personals = await personalService.getSeniorsByOtdelId(otdelId);
    return res.json(personals);
  }

  async getHeadByOtdelId(req, res) {
    const otdelId = req.params.otdelId || req.query.otdelId || req.body.otdelId;
    const personal = await personalService.getHeadByOtdelId(otdelId);
    return res.json(personal);
  }

  async getHeadsByOtdelId(req, res) {
    const otdelId = req.params.otdelId || req.query.otdelId || req.body.otdelId;
    const personals = await personalService.getHeadsByOtdelId(otdelId);
    return res.json(personals);
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

  async destroy(req, res) {
    const id = req.body.id;
    const deleted = await personalService.destroyById(id);
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'destroy.success.one',
      data: deleted
    }));
  }
}

module.exports = new BaseController({ restDataName });
