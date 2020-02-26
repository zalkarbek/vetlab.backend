const controller = require('./planRaboty.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/plan/all', safeAsync(controller.all));
  routes.get('/v1/plan/all/:id', safeAsync(controller.id));
  routes.post('/v1/plan/create', safeAsync(controller.create));
  routes.post('/v1/plan/update', safeAsync(controller.update));
  routes.post('/v1/plan/destroy', safeAsync(controller.destroy));
  return routes;
};
