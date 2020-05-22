const Controller = require('../controller');
const SOCKS = require('../../data/socketData');
const db = Controller.getInject('db');
const restDataName = 'option';

class OptController extends Controller {
  constructor(params) {
    super(params);
  }
  async getSocketEvents(req, res) {
    return res.json({
      error: false,
      socketEvents: SOCKS.EVENTS
    });
  }

  async getSocks(req, res) {
    return res.json(SOCKS);
  }

  async getModelFields(req, res) {
    const { model } = req.query;
    const upper = String(model).toUpperCase();
    const fields = db.FIELDS[upper];
    return res.json(fields);
  }
}

module.exports = new OptController({ restDataName });
