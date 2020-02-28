const controller = require('./metod.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/metod/all', safeAsync(controller.all));
  routes.get('/v1/metod/all/:id', safeAsync(controller.id));
  routes.post('/v1/metod/create', safeAsync(controller.create));
  routes.put('/v1/metod/update', safeAsync(controller.update));
  routes.delete('/v1/metod/destroy', safeAsync(controller.destroy));
  return routes;
};
