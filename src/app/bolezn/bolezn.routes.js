const controller = require('./bolezn.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/bolezn/all', safeAsync(controller.all));
  routes.get('/v1/bolezn/all/:id', safeAsync(controller.id));
  routes.post('/v1/bolezn/create', safeAsync(controller.create));
  routes.post('/v1/bolezn/update', safeAsync(controller.update));
  routes.post('/v1/bolezn/destroy', safeAsync(controller.destroy));
  return routes;
};
