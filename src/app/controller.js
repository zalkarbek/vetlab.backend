const Container = require('./Handler');
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
    this.allPaginate = this.allPaginate.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    this.search = this.search.bind(this);
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

  static getRestDataByName(name) {
    return restData[name];
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
    const { id } = req.params.id || req.query.id || req.body.id;
    const unit = await refService.getById( this.map.get('modelName'), id);
    return res.json(unit);
  }

  async idUpdate(req, res) {
    const id = req.params.id || req.query.id || req.body.id;
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
    const id = req.params.id || req.query.id || req.body.id;
    const deleted = await refService.destroyById(this.map.get('modelName'), id);
    return res.json(rest.responseWith({
      unit:  this.map.get('i18nUnitOne'),
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  async all(req, res) {
    const { attributes = [], options = {} } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await refService.getAll(this.map.get('modelName'), options);
    res.json(result);
  }

  async allPaginate(req, res) {
    const {
      page = 1,
      pageSize = 10,
      attributes,
      options = {}
    } = refService.getObjectOneOfTwo(req.query, req.body);
    if (Array.isArray(attributes) && attributes.length >= 1) {
      options.attributes = attributes;
    }
    const result = await refService.getAllPaginate(this.map.get('modelName'), { page, pageSize }, options);
    res.json(result);
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
    const id = req.body.id;
    const deleted = await refService.destroyById(this.map.get('modelName'), id);
    return res.json(rest.responseWith({
      unit:  this.map.get('i18nUnitOne'),
      message: 'destroy.success.one',
      data: deleted
    }));
  }

  async search(req, res) {
    const {
      page,
      pageSize,
      search,
      searchColumn,
      searchPosition,
      attributes
    } = refService.getObjectOneOfTwo(req.query, req.body);
    const searchResult = await refService.search(this.map.get('modelName'), {
      page,
      pageSize,
      search,
      searchColumn,
      searchPosition,
      attributes
    });
    res.json(searchResult);
  }
}

module.exports = Controller;
