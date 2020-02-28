const controller = require('./isledovanie.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/isledovanie/all', safeAsync(controller.all));
  routes.get('/v1/isledovanie/all/:id', safeAsync(controller.id));
  routes.post('/v1/isledovanie/create', safeAsync(controller.create));
  routes.put('/v1/isledovanie/update', safeAsync(controller.update));
  routes.delete('/v1/isledovanie/destroy', safeAsync(controller.destroy));
  return routes;
};
