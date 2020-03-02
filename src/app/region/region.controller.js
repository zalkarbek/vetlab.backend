const Controller = require('../controller');
const regionService = Controller.getService('region');
const rest = Controller.getHelper('rest');

class RegionController extends Controller {
  constructor() {
    super();
    this.modelName = 'sRegion';
    this.i18nUnitOne = 'region.one';
    this.i18nUnitMany = 'region.many';
  }

  // ========================= REGIONS TYPE ================================//
  async getRegionTypeById(req, res) {
    const { id } = req.params;
    const region = await regionService.getRegionTypeById(id);
    return res.json(region);
  }

  async getRegionTypes(req, res) {
    const regions = await regionService.getRegionTypes();
    res.json(regions);
  }

  async createRegionType(req, res) {
    const data = req.body;
    const created = await regionService.createRegionType(data);
    return res.json(rest.responseWith({
      unit: 'region.type.one',
      message: 'create.success.one',
      data: created
    }));
  }

  async updateRegionType(req, res) {
    const data = req.body;
    const updated = await regionService.updateRegionTypeById(data);
    return res.json(rest.responseWith({
      unit: 'region.type.one',
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroyRegionType(req, res) {
    const { id } = req.body;
    const deleted = await regionService.destroyRegionTypeById(id);
    return res.json(rest.responseWith({
      unit: 'region.type.one',
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  // ========================= REGIONS ================================//
  async getRegionById(req, res) {
    const { id } = req.params;
    const region = await regionService.getRegionById(id);
    return res.json(region);
  }

  async getRegions(req, res) {
    const regions = await regionService.getRegions();
    res.json(regions);
  }

  async createRegion(req, res) {
    const data = req.body;
    const region = await regionService.createRegion(data);
    return res.json(rest.responseWith({
      unit: 'region.one',
      message: 'create.success.one',
      data: region
    }));
  }

  async updateRegion(req, res) {
    const data = req.body;
    const updated = await regionService.updateRegionById(data);
    return res.json(rest.responseWith({
      unit: 'region.one',
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroyRegion(req, res) {
    const { id } = req.body;
    const deleted = await regionService.destroyRegionById(id);
    return res.json(rest.responseWith({
      unit: 'region.one',
      message: 'destroy.success.one',
      data: deleted
    }));
  }
}

module.exports = new RegionController();
