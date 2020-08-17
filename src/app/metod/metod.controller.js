const Controller = require('../controller');
const refService = Controller.getService('ref');
const restDataName = 's_metod';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    const { attributes = [], options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    let where = {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    if(!req.isAdmin) {
      where = refService.otdeleniaWhereBuild(where, req.payload.personal.sOtdeleniaId);
    }
    const result = await refService
      .getAll(
        this.map.get('modelName'),
        { ...options, ...where }
      );
    res.json(result);
  }

  async allPaginate(req, res) {
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    let where = {};

    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    if(!req.isAdmin) {
      where = refService.otdeleniaWhereBuild(where, req.payload.personal.sOtdeleniaId);
    }

    const result = await refService
      .getAllPaginate(
        this.map.get('modelName'),
        { page, pageSize },
        { ...options, ...where }
      );
    res.json(result);
  }
}

module.exports = new BaseController({ restDataName });
