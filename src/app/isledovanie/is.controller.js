const _ = require('lodash');
const Controller = require('../controller');
const refService = Controller.getService('ref');
const isledovanieService = Controller.getService('isledovanie');
const restDataName = 'isledovanie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async all(req, res) {
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
    if(!req.isAdmin) {
      where = {
        isOtdelId: req.payload.personal.otdelId
      };
    }
    options.where = {
      ...where
    };
    const result = await isledovanieService.getAllPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async allPaginate(req, res) {
    let where = {};
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
    if(!req.isAdmin) {
      where = {
        isOtdelId: req.payload.personal.otdelId
      };
    }
    const result = await isledovanieService.getAllPaginateWithSearch(
      { page, pageSize, search, searchColumn, searchPosition, where },
      options
    );
    res.json(result);
  }

  async getLastByNomerToOtdel(req, res) {
    const otdelId = _.get(req.payload, 'personal.otdelId', null);
    const last = await isledovanieService.getLastNomerByOtdelId(otdelId);
    res.json({
      nomer: _.get(last, 'nomer', 0) || 0,
      otdelId,
      last
    });
  }

}

module.exports = new BaseController({ restDataName });
