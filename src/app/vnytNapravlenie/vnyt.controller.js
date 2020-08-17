const _ = require('lodash');
const Controller = require('../controller');
const refService = Controller.getService('ref');
const vnytService = Controller.getService('vnytNapravlenie');
const restDataName = 'vnytNapravlenie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async id(req, res) {
    const { id, attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await vnytService.getVnytNapravlenieById(id, options);
    return res.json(result);
  }

  async getAllWith(req, res) {
    const {attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await vnytService.getAllVnytNapravlenieRel();
    res.json(result);
  }

  async getAllRelPaginateEpic(req, res) {
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
        napravlenOtdelId: req.payload.personal.otdelId
      };
    }
    const result = await vnytService.getAllEpicRelPaginate(
      { page, pageSize, search, searchColumn, searchPosition, where },
      options
    );
    res.json(result);
  }

  async getAllRelPaginatePub(req, res) {
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
        napravlenOtdelId: req.payload.personal.otdelId
      };
    }
    const result = await vnytService.getAllPubRelPaginate(
      { page, pageSize, search, searchColumn, searchPosition, where },
      options
    );
    res.json(result);
  }

  async getLastByNomerToOtdel(req, res) {
    const otdelId = req.query.otdelId || req.body.otdelId || _.get(req.payload, 'personal.otdelId', null);
    const last = await vnytService.getLastNomerByOtdelId(otdelId);
    res.json({
      nomer: _.get(last, 'nomer', 0) || 0,
      otdelId,
      last
    });
  }

}

module.exports = new BaseController({ restDataName });
