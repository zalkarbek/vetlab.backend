const controller = require('./department.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/department/all', safeAsync(controller.all));
  routes.get('/v1/department/all/:id', safeAsync(controller.id));
  routes.post('/v1/department/create', safeAsync(controller.create));
  routes.put('/v1/department/update', safeAsync(controller.update));
  routes.delete('/v1/department/destroy', safeAsync(controller.destroy));
  return routes;
};
