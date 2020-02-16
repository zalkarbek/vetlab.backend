
const socketEvents = require('../../data/socketData');

class OptController {
  async getSocketEvents(req, res) {
    return res.json({
      error: false,
      socketEvents: socketEvents.EVENTS
    });
  }
}

module.exports = new OptController();
module.exports.OptController = OptController;
