const controller = require('./protocol.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/protocol/all', safeAsync(controller.all));
  routes.get('/v1/protocol/all/:id', safeAsync(controller.id));
  routes.post('/v1/protocol/create', safeAsync(controller.create));
  routes.post('/v1/protocol/update', safeAsync(controller.update));
  routes.post('/v1/protocol/destroy', safeAsync(controller.destroy));
  return routes;
};
