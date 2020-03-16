const Controller = require('../controller');
const socketEvents = require('../../data/socketData');
const db = Controller.getInject('db');
const restDataName = 'option';

class OptController extends Controller {
  constructor(params) {
    super(params);
  }
  async getSocketEvents(req, res) {
    return res.json({
      error: false,
      socketEvents: socketEvents.EVENTS
    });
  }

  async getModelFields(req, res) {
    const { model } = req.query;
    const upper = String(model).toUpperCase();
    const fields = db.FIELDS[upper];
    return res.json(fields);
  }
}

module.exports = new OptController({ restDataName });
