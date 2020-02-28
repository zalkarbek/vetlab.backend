const controller = require('./pokazatel.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/pokazatel/all', safeAsync(controller.all));
  routes.get('/v1/pokazatel/all/:id', safeAsync(controller.id));
  routes.post('/v1/pokazatel/create', safeAsync(controller.create));
  routes.put('/v1/pokazatel/update', safeAsync(controller.update));
  routes.delete('/v1/pokazatel/destroy', safeAsync(controller.destroy));
  return routes;
};
