const controller = require('./doljnost.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/doljnost/all', safeAsync(controller.all));
  routes.get('/v1/doljnost/all/:id', safeAsync(controller.id));
  routes.post('/v1/doljnost/create', safeAsync(controller.create));
  routes.put('/v1/doljnost/update', safeAsync(controller.update));
  routes.delete('/v1/doljnost/destroy', safeAsync(controller.destroy));
  return routes;
};
