const Controller = require('../controller');
const _ = require('lodash');
const restDataName = 's_pokazatel';
const refService = Controller.getService('ref');
const rest = Controller.getHelper('rest');

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async create(req, res) {
    const data = req.body || {};
    const sOtdeleniaId = _.get(req.payload, 'personal.otdel.sOtdeleniaId', null);
    data.sOtdeleniaId = data.sOtdeleniaId || sOtdeleniaId;
    const created = await refService.create(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'create.success.one',
      data: created
    }));
  }

  async update(req, res) {
    const data = req.body || {};
    const sOtdeleniaId = _.get(req.payload, 'personal.otdel.sOtdeleniaId', null);
    data.sOtdeleniaId = data.sOtdeleniaId || sOtdeleniaId;
    const updated = await refService.updateById(this.map.get('modelName'), data);

    return res.json(rest.responseWith({
      unit: this.map.get('i18nUnitOne'),
      message: 'update.success.one',
      data: updated
    }));
  }
}

module.exports = new BaseController({ restDataName });
