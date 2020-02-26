const controller = require('./subOtdel.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/otdel/sub/all', safeAsync(controller.all));
  routes.get('/v1/otdel/sub/all/:id', safeAsync(controller.id));
  routes.post('/v1/otdel/sub/create', safeAsync(controller.create));
  routes.post('/v1/otdel/sub/update', safeAsync(controller.update));
  routes.post('/v1/otdel/sub/destroy', safeAsync(controller.destroy));
  return routes;
};
