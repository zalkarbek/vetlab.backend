const Controller = require('../controller');
const socketEvents = require('../../data/socketData');

class OptController extends Controller {
  async getSocketEvents(req, res) {
    return res.json({
      error: false,
      socketEvents: socketEvents.EVENTS
    });
  }
}

module.exports = new OptController();
