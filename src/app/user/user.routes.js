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

  routes.get('/v1/user/all', safeAsync(controller.all));
  routes.get('/v1/user/all/:id', safeAsync(controller.id));
  routes.put('/v1/user/all/:id/update', safeAsync(controller.update));
  routes.delete('/v1/user/all/:id/destroy', safeAsync(controller.destroy));

  routes.get('/v1/user/all/:id/roles/get', safeAsync(controller.getRoles));
  routes.post('/v1/user/all/:id/roles/add', safeAsync(controller.addRoles));
  routes.delete('/v1/user/all/:id/roles/remove', safeAsync(controller.removeRoles));

  routes.post('/v1/user/create', safeAsync(controller.create));
  routes.put('/v1/user/update', safeAsync(controller.update));
  routes.delete('/v1/user/destroy', safeAsync(controller.destroy));

  return routes;
};
