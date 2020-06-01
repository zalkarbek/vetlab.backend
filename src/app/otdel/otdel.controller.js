const Controller = require('../controller');
const otdelService = Controller.getService('otdel');
const refService = Controller.getService('ref');
const restDataName = 'otdel';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    const { attributes = [], options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await otdelService.getAll(options);
    res.json(result);
  }

  async allPaginate(req, res) {
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await otdelService.getAllPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async getWithOtdelenia(req, res) {
    const { id } = otdelService.getObjectOneOfTwo(req.query, req.body);
    const result = await otdelService.getWithOtdelenia(id);
    return res.json(result);
  }

  async getWithNonSpec(req, res) {
    const result = await otdelService.getWithNonSpec();
    return res.json(result);
  }
}

module.exports = new BaseController({ restDataName });
