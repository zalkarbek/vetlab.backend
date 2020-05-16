const Controller = require('../controller');
const rest = Controller.getHelper('rest');
const refService = Controller.getService('ref');
const otdelService = Controller.getService('otdel');
const personalService = Controller.getService('personal');
const directionService = Controller.getService('napravlenie');
const vnytNapravlenieService = Controller.getService('vnytNapravlenie');
const restDataName = 'napravlenie';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    const { attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await directionService.getAllWithPosMaterial(options);
    res.json(result);
  }

  async allWithPosMaterial(req, res) {
    const { attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await directionService.getAllWithPosMaterial(options);
    res.json(result);
  }

  async allWithPosMaterialWithPaginate(req, res) {
    const  { page, pageSize, attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await directionService.getAllWithPosMaterialWithPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async create(req, res) {
    const { posMaterials, ...napravlenie } = req.body;
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
      dataZapolnenia,
      status: 'new'
    };
    const createdDirection = await directionService.createNapravlenieWithPosMaterial(
      updatedDirection,
      posMaterials
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

  async update(req, res) {
    const { posMaterials, ...napravlenie } = req.body;
    const updatedDirection = await directionService.updateNapravlenieWithPosMaterial(napravlenie, posMaterials);
    if(!updatedDirection) {
      throw new Error('napravlenie not updated');
    }
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'update.success.one',
      data: updatedDirection
    }));
  }

  async sendToOtdel(req, res) {
    const postData = req.body || {};
    const payload = req.payload;
    const department = await otdelService.getDepartmentByOtdelId(postData.napravlenOtdelId);
    const napravilPersonalId = payload.personal.id;
    const napravlenDepartmentId = department && department.id;
    const napravlenieId = postData.napravlenieId;

    const createdVnytNapravlenie = await vnytNapravlenieService.createVnytNapravlenie({
      ...postData,
      napravilPersonalId,
      napravlenDepartmentId,
      status: 'pending'
    });
    await directionService.updateNapravlenieStatus(napravlenieId, 'sended');

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
