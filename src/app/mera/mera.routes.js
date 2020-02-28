const controller = require('./mera.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/mera/all', safeAsync(controller.all));
  routes.get('/v1/mera/all/:id', safeAsync(controller.id));
  routes.post('/v1/mera/create', safeAsync(controller.create));
  routes.put('/v1/mera/update', safeAsync(controller.update));
  routes.delete('/v1/mera/destroy', safeAsync(controller.destroy));
  return routes;
};
