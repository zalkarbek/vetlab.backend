const Controller = require('../controller');
const refService = Controller.getService('ref');
const napravlenieService = Controller.getService('napravlenie');
const restDataName = 'vnytNapravlenie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async getAllVnytNapravlenieWith(req, res) {
    const {attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await napravlenieService.getAllVnytNapravlenieRel();
    res.json(result);
  }

  async getAllVnytNapravlenieRelPaginate(req, res) {
    const { page = 1, pageSize = 10, attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await napravlenieService.getAllVnytNapravlenieRelPaginate({ page, pageSize }, options);
    res.json(result);
  }

  async getVnytNapravlenieById(req, res) {
    const { id, attributes, options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await napravlenieService.getVnytNapravlenieById(id, options);
  }


}

module.exports = new BaseController({ restDataName });
