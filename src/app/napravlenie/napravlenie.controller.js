const Controller = require('../controller');
const rest = Controller.getHelper('rest');
const otdelService = Controller.getService('otdel');
const personalService = Controller.getService('personal');
const directionService = Controller.getService('napravlenie');
const restDataName = 'napravlenie';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async allWithPosMaterial(req, res) {
    const attributes = req.query.attributes || req.body.attributes;
    const options = req.body.options || req.query.options || {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await directionService.getAllWithPosMaterial(options);
    res.json(result);
  }

  async allWithPosMaterialWithPaginate(req, res) {
    const page = req.query.page || req.body.page || 1;
    const pageSize = req.query.pageSize || req.body.pageSize || 10;
    const attributes = req.query.attributes || req.body.attributes;
    const options = req.body.options || req.query.options || {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await directionService.getAllWithPosMaterialWithPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async create(req, res) {
    const { pos_material, ...napravlenie } = req.body;
    const payload = req.payload;
    const personal = await personalService.getPersonalById(payload.personal.id);
    const department = await otdelService.getDepartmentByOtdelId(personal.otdelId);
    const zapolnilPersonalId = personal.id;
    const zapolnilDepartmentId = department.id;
    const zapolnilDate = new Date();
    const dataZapolnenia = new Date();
    const updatedDirection = {
      ...napravlenie,
      zapolnilPersonalId,
      zapolnilDepartmentId,
      zapolnilDate,
      dataZapolnenia
    };
    const createdDirection = await directionService.createNapravlenieWithPosMaterial(
      updatedDirection,
      pos_material
    );
    if(!createdDirection) {
      throw new Error('napravlenie not saved');
    }
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'create.success.one',
      data: createdDirection
    }));
  }

  async sendToOtdel(req, res) {
    const postData = req.body || {};
    const payload = req.payload;
    const department = await otdelService.getDepartmentByOtdelId(postData.napravlenOtdelId);
    const napravilPersonalId = payload.personal.id;
    const napravlenDepartmentId = department && department.id;

    const createdVnytNapravlenie = await directionService.createVnytNapravlenie({
      ...postData,
      napravilPersonalId,
      napravlenDepartmentId
    });

    if(!createdVnytNapravlenie) {
      throw new Error('vnytNapravlenie not sended');
    }
    return res.json(rest.response({
      message: 'vnytNapravlenie.send.success',
      data: createdVnytNapravlenie
    }));
  }
}

module.exports = new BaseController({ restDataName });
