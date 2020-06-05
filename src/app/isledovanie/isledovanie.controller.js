const Controller = require('../controller');
const refService = Controller.getService('ref');
const isledovanieService = Controller.getService('isledovanie');
const restDataName = 'isledovanie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await isledovanieService.getAllPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async allPaginate(req, res) {
    const {
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
    const result = await isledovanieService.getAllPaginateWithSearch(
      { page, pageSize, search, searchColumn, searchPosition },
      options
    );
    res.json(result);
  }
}

module.exports = new BaseController({ restDataName });
