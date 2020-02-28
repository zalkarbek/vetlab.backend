const controller = require('./otdel.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/otdel/all', safeAsync(controller.all));
  routes.get('/v1/otdel/all/:id', safeAsync(controller.id));
  routes.post('/v1/otdel/create', safeAsync(controller.create));
  routes.put('/v1/otdel/update', safeAsync(controller.update));
  routes.delete('/v1/otdel/destroy', safeAsync(controller.destroy));
  return routes;
};
