const Controller = require('../controller');
const _ = require('lodash');
const restDataName = 's_pokazatel_pdk';
const refService = Controller.getService('ref');
const pokazatelPdkService = Controller.getService('pokazatelPdk');
const rest = Controller.getHelper('rest');

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    let sOtdeleniaId = null;
    let result;
    const { attributes = [], options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    if(req.isAdmin) {
      result = await pokazatelPdkService.getAllAdmin({
        ...options
      });
    } else {
      sOtdeleniaId = req.payload.personal.sOtdeleniaId;
      result = await pokazatelPdkService.getAll({
        ...options,
      }, sOtdeleniaId);
    }

    res.json(result);
  }

  async allPaginate(req, res) {
    let sOtdeleniaId = null;
    let where = {};
    let result;
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }

    if(req.isAdmin) {
      result = await pokazatelPdkService.getAllPaginateAdmin({ page, pageSize }, {
        ...options,
      });
    } else {
      sOtdeleniaId = req.payload.personal.sOtdeleniaId;
      result = await pokazatelPdkService.getAllPaginate({ page, pageSize }, {
        ...options,
        where
      }, sOtdeleniaId);
    }

    res.json(result);
  }

  async getPdkByPokazatelAndMaterial(req, res) {
    const {
      attributes = [],
      options = {},
      pokazatelId,
      materialId
    } = refService.getObjectOneOfTwo(req.query, req.body);
    let result;
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    result = await pokazatelPdkService.getByPokazatelAndMaterial(pokazatelId, materialId);

    res.json(result);
  }

  async create(req, res) {
    const data = req.body || {};
    const created = await pokazatelPdkService.create(data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body || {};
    const updated = await pokazatelPdkService.updateById(data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'update.success.one',
      data: updated
    }));
  }
}

module.exports = new BaseController({ restDataName });
