const Container = require('../container');
const refService = Container.getService('ref');
const rest = Container.getHelper('rest');
const restData = Container.getInject('restApi');

class Controller {
  constructor({ restDataName } = {}) {
    const restCurrentApi = restData[restDataName];
    const keys = Object.keys(restCurrentApi);

    this.restDataName = restDataName;
    this.restApi = restCurrentApi;
    this.map = new Map();

    keys.forEach((key) => {
      this.map.set(key, restCurrentApi[key]);
    });

    this.id = this.id.bind(this);
    this.idUpdate = this.id.bind(this);
    this.idDestroy = this.id.bind(this);
    this.all = this.all.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  static getService(name) {
    return Container.getService(name);
  }

  static getInject(name) {
    return Container.getInject(name);
  }

  static getHelper(name) {
    return Container.getHelper(name);
  }

  static getMiddleware(name) {
    return Container.getMiddleware(name);
  }

  static getRestData() {
    return restData;
  }

  getService(name) {
    return Container.getService(name);
  }

  getInject(name) {
    return Container.getInject(name);
  }

  getHelper(name) {
    return Container.getHelper(name);
  }

  getMiddleware(name) {
    return Container.getMiddleware(name);
  }

  getRestData() {
    return restData[this.restDataName];
  }

  async id(req, res) {
    const { id } = req.params;
    const unit = await refService.getById( this.map.get('modelName'), id);
    return res.json(unit);
  }

  async idUpdate(req, res) {
    const { id } = req.params;
    const data = req.body;
    data.id = id;
    const updated = await refService.updateById(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'update.success.one',
      data: updated
    }));
  }

  async idDestroy(req, res) {
    const { id } = req.params;
    const deleted = await refService.destroyById(this.map.get('modelName'), id);
    return res.json(rest.responseWith({
      unit:  this.map.get('i18nUnitOne'),
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  async all(req, res) {
    console.log(this.map.get('modelName'));
    const regions = await refService.getAll(this.map.get('modelName'));
    res.json(regions);
  }

  async create(req, res) {
    const data = req.body;
    const created = await refService.create(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body;
    const updated = await refService.updateById(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'update.success.one',
      data: updated
    }));
  }

  async destroy(req, res) {
    const { id } = req.body;
    const deleted = await refService.destroyById(this.map.get('modelName'), id);
    return res.json(rest.responseWith({
      unit:  this.map.get('i18nUnitOne'),
      message: 'destroy.success.one',
      data: deleted
    }));
  }
}

module.exports = Controller;
