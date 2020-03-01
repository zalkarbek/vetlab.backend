const Controller = require('../controller');
const refService = Controller.getService('ref');
const rest = Controller.getHelper('rest');

class IsledovanieController extends Controller {

  constructor() {
    super();
    this.modelName = 'isledovanie';
    this.i18nUnitOne = 'isledovanie.one';
    this.i18nUnitMany = 'isledovanie.many';
    this.id = this.id.bind(this);
    this.all = this.all.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
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

module.exports = new IsledovanieController();
