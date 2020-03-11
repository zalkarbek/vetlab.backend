const Controller = require('../controller');
const socketEvents = require('../../data/socketData');
const db = Controller.getInject('db');

class OptController extends Controller {
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

module.exports = new OptController();
