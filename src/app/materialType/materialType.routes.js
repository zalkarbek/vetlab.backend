const controller = require('./materialType.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/material/type/all', safeAsync(controller.all));
  routes.get('/v1/material/type/all/:id', safeAsync(controller.id));
  routes.post('/v1/material/type/create', safeAsync(controller.create));
  routes.post('/v1/material/type/update', safeAsync(controller.update));
  routes.post('/v1/material/type/destroy', safeAsync(controller.destroy));
  return routes;
};
