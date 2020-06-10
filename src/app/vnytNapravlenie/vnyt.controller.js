const Controller = require('../controller');
const refService = Controller.getService('ref');
const vnytNapravlenieService = Controller.getService('vnytNapravlenie');
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
    const result = await vnytNapravlenieService.getVnytNapravlenieById(id, options);
    return res.json(result);
  }

  async getAllVnytNapravlenieWith(req, res) {
    const {attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await vnytNapravlenieService.getAllVnytNapravlenieRel();
    res.json(result);
  }

  async getAllVnytNapravlenieRelPaginateEpic(req, res) {
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
    const result = await vnytNapravlenieService.getAllEpicRelPaginate(
      { page, pageSize, search, searchColumn, searchPosition },
      options
    );
    res.json(result);
  }

  async getAllVnytNapravlenieRelPaginatePub(req, res) {
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
    const result = await vnytNapravlenieService.getAllPubRelPaginate(
      { page, pageSize, search, searchColumn, searchPosition },
      options
    );
    res.json(result);
  }
}

module.exports = new BaseController({ restDataName });
