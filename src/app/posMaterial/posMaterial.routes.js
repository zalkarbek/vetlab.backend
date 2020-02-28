const controller = require('./posMaterial.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/pos/material/all', safeAsync(controller.all));
  routes.get('/v1/pos/material/all/:id', safeAsync(controller.id));
  routes.post('/v1/pos/material/create', safeAsync(controller.create));
  routes.put('/v1/pos/material/update', safeAsync(controller.update));
  routes.delete('/v1/pos/material/destroy', safeAsync(controller.destroy));
  return routes;
};
