const controller = require('./user.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');
const container = require('../../container');
const ROLES = container.getInject('USER_ROLES');

module.exports = ({ routes }) => {
  routes.get(
    '/v1/user/profile'
    ,restTokenVerify
    ,restRoleVerify([ ROLES.USER.KEY ])
    ,safeAsync(controller.getUserProfile)
  );

  routes.get('/v1/users', safeAsync(controller.all));
  routes.get('/v1/users/paginate', safeAsync(controller.getAllPaginate));
  routes.get('/v1/users/with/role', safeAsync(controller.getUsersWithRoles));
  routes.get('/v1/users/with/personal', safeAsync(controller.getUsersWithPersonal));
  routes.get('/v1/users/:id', safeAsync(controller.id));
  routes.put('/v1/users/:id/update', safeAsync(controller.update));
  routes.delete('/v1/users/:id/destroy', safeAsync(controller.destroy));

  routes.get('/v1/users/:id/roles/get', safeAsync(controller.getRoles));
  routes.post('/v1/users/:id/roles/add', safeAsync(controller.addRoles));
  routes.delete('/v1/users/:id/roles/remove', safeAsync(controller.removeRoles));

  routes.post('/v1/users/create', safeAsync(controller.create));
  routes.put('/v1/users/update', safeAsync(controller.update));
  routes.delete('/v1/users/destroy', safeAsync(controller.destroy));

  return routes;
};
