
const socketEvents = require('../../data/socketData');

class ToolsController {
  async getSocketEvents(req, res) {
    return res.json({
      error: false,
      socketEvents: socketEvents.EVENTS
    });
  }
}

module.exports = new ToolsController();
module.exports.ToolsController = ToolsController;
