const Controller = require('../controller');
const restDataName = 's_region';
const regionService = Controller.getService('region');

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async getRegionsFullPathKg(req, res) {
    const { attributes } = req.query || req.body;
    const options = {};
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const regions = await regionService.getRegionsFullPathKg(options);
    return res.json(regions);
  }

  async getRegionsFullPathKgWithPaginate(req, res) {
    const {
      search,
      searchColumn,
      searchPosition,
      attributes,
      page = 1,
      pageSize = 10
    } = req.query || req.body;

    const regions = await regionService.getRegionsFullPathKgPaginate({
      page,
      pageSize,
      search,
      searchColumn,
      searchPosition,
      attributes
    });
    return res.json(regions);
  }

  async getRegionFullPathKgById(req, res) {
    const { attributes } = req.query || req.body;
    const options = {};
    const id = req.body.id || req.query.id;
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const regions = await regionService.getRegionFullPathKgById(id, options);
    return res.json(regions);
  }
}

module.exports = new BaseController({ restDataName });
