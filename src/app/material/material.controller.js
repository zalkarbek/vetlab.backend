const Controller = require('../controller');
const refService = Controller.getService('ref');

class MaterialController extends Controller {

  constructor() {
    super();
    this.modelName = 'sMaterial';
    this.i18nUnitOne = 'material.one';
    this.i18nUnitMany = 'material.many';
  }

  async id(req, res) {
    const { id } = req.params;
    const unit = await refService.getById(this.modelName, id);
    return res.json(unit);
  }

  async all(req, res) {
    const regions = await refService.getAll(this.modelName);
    res.json(regions);
  }

  async create(req, res) {
    const data = req.body;
    const created = await refService.create(this.modelName, data);

    return res.json(rest.responseWith({
      unit:  this.i18nUnitOne,
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body;
    const updated = await refService.updateById(this.modelName, data);

    return res.json(rest.responseWith({
      unit: this.i18nUnitOne,
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroy(req, res) {
    const { id } = req.body;
    const deleted = await refService.destroyById(this.modelName, id);
    return res.json(rest.responseWith({
      unit: this.i18nUnitOne,
      message: 'destroy.success.one',
      data: deleted
    }));
  }
}

module.exports = new MaterialController();
