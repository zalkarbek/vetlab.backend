const controller = require('./roles.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/roles', safeAsync(controller.all));
  routes.get('/v1/roles/:id', safeAsync(controller.id));
  routes.get('/v1/roles/:id/users', safeAsync(controller.getUsers));
  routes.post('/v1/roles/:id/users/add', safeAsync(controller.addUsers));

  routes.post('/v1/roles/create', safeAsync(controller.create));
  routes.put('/v1/roles/update', safeAsync(controller.update));
  routes.delete('/v1/roles/destroy', safeAsync(controller.destroy));
  return routes;
};
