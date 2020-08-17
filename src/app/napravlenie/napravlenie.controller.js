const _ = require('lodash');
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

  async id(req, res) {
    const id = req.params.id || req.query.id || req.body.id;
    const result = await directionService.getById(id);
    return res.json(result);
  }

  async all(req, res) {
    let where = {};
    const { attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }

    if(!req.isAdmin) {
      where = {
        otdelId: req.payload.personal.otdelId
      };
    }
    options.where = {
      ...where
    };

    const result = await directionService.getAllWithPosMaterial({
      ...options,
    });
    res.json(result);
  }

  async allWithPosMaterial(req, res) {
    let where = {};
    const { attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    if(!req.isAdmin) {
      where = {
        otdelId: req.payload.personal.otdelId
      };
    }
    options.where = {
      ...where
    };

    const result = await directionService.getAllWithPosMaterial(options);
    res.json(result);
  }

  async allWithPosMaterialWithPaginate(req, res) {
    let where = {};
    const  {
      page,
      pageSize,
      attributes,
      search,
      searchColumn,
      searchPosition,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    if(!req.isAdmin) {
      where = {
        otdelId: req.payload.personal.otdelId
      };
    }

    const result = await directionService.getAllWithPosMaterialWithPaginate(
      { page, pageSize, search, searchColumn, searchPosition, where },
      options
    );
    res.json(result);
  }

  async allWithPosMaterialWithPaginateAndVnyt(req, res) {
    let where = {};
    const  {
      page,
      pageSize,
      attributes,
      search,
      searchColumn,
      searchPosition,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }

    if(!req.isAdmin) {
      where = {
        otdelId: req.payload.personal.otdelId
      };
    }

    const result = await directionService.getAllWithPosMaterialWithPaginateAndVnyt(
      { page, pageSize, search, searchColumn, searchPosition, where },
      options
    );
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
    const lastNomer = await directionService.getLastNomerByOtdelId(napravlenie.otdelId);
    let nomer = Number(lastNomer.nomer);
    if(!nomer || Number.isNaN(nomer)) {
      nomer = 1;
    }
    const updatedDirection = {
      ...napravlenie,
      nomer: nomer + 1,
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
    const direction = await directionService.getById(createdDirection.id);
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'create.success.one',
      data: direction
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

  async destroy(req, res) {
    const id = req.body.id;
    const deleted = await directionService.destroyById(id);
    return res.json(rest.responseWith({
      unit:  restData.i18nUnitOne,
      message: 'destroy.success.one',
      data: deleted
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

  async getLastByNomerToOtdel(req, res) {
    const otdelId = req.query.otdelId || req.body.otdelId || _.get(req.payload, 'personal.otdelId', null);
    const last = await directionService.getLastNomerByOtdelId(otdelId);
    res.json({
      nomer: _.get(last, 'nomer', 0) || 0,
      otdelId,
      last
    });
  }
}

module.exports = new BaseController({ restDataName });
