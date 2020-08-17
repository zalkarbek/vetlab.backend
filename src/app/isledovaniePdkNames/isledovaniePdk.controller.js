const Controller = require('../controller');
const refService = Controller.getService('ref');
const restDataName = 'isledovanie_pdk_names';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    let where = {};
    const { attributes = [], options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    // if(!req.isAdmin) {
    //   where = {
    //     sOtdeleniaId: req.payload.personal.sOtdeleniaId
    //   };
    // }

    const result = await refService.getAll(this.map.get('modelName'), {
      ...options,
      where
    });
    res.json(result);
  }

  async allPaginate(req, res) {
    let where = {};
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }

    // if(!req.isAdmin) {
    //   where = {
    //     sOtdeleniaId: req.payload.personal.sOtdeleniaId
    //   };
    // }

    const result = await refService.getAllPaginate(this.map.get('modelName'), { page, pageSize }, {
      ...options,
      where
    });
    res.json(result);
  }

  async create(req, res) {
    const data = req.body || {};
    const sOtdeleniaId = _.get(req.payload, 'personal.otdel.sOtdeleniaId', null);
    data.sOtdeleniaId = data.sOtdeleniaId || sOtdeleniaId;
    const created = await refService.create(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body || {};
    const sOtdeleniaId = _.get(req.payload, 'personal.otdel.sOtdeleniaId', null);
    data.sOtdeleniaId = data.sOtdeleniaId || sOtdeleniaId;
    const updated = await refService.updateById(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'update.success.one',
      data: updated
    }));
  }
}

module.exports = new BaseController({ restDataName });
