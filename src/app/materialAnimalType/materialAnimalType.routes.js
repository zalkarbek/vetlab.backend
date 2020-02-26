const controller = require('./materialAnimalType.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/material/animal/type/all', safeAsync(controller.all));
  routes.get('/v1/material/animal/type/all/:id', safeAsync(controller.id));
  routes.post('/v1/material/animal/type/create', safeAsync(controller.create));
  routes.post('/v1/material/animal/type/update', safeAsync(controller.update));
  routes.post('/v1/material/animal/type/destroy', safeAsync(controller.destroy));
  return routes;
};
