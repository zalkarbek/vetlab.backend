const _ = require('lodash');
const Controller = require('../controller');
const posMaterialService = Controller.getService('posMaterial');
const refService = Controller.getService('ref');
const restDataName = 'pos_material';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async id(req, res) {
    const id = req.params.id || req.query.id || req.body.id;
    const unit = await refService.getById( this.map.get('modelName'), id);
    return res.json(unit);
  }

  async all(req, res) {
    const {
      options = {},
      attributes,
      ...other
    } = refService.getObjectOneOfTwo(req.body, req.query);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    options.where = {
      ...other
    };
    const result = await posMaterialService.getAll(options);
    res.json(result);
  }

  async allPaginate(req, res) {
    const {
      page = 1,
      pageSize = 10,
      options = {},
      attributes,
      ...other
    } = refService.getObjectOneOfTwo(req.body, req.query);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    options.where = {
      ...other
    };
    const result = await posMaterialService.getAllPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async getLastByNomerToOtdel(req, res) {
    const otdelId = req.query.otdelId || req.body.otdelId || _.get(req.payload, 'personal.otdelId', null);
    const last = await posMaterialService.getLastNomerByOtdelId(otdelId);
    res.json({
      nomer: _.get(last, 'nomer', 0) || 0,
      otdelId,
      last
    });
  }
}

module.exports = new BaseController({ restDataName });
