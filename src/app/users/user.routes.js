const controller = require('./user.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');
const container = require('../../container');
const ROLES = container.getInject('USER_ROLES');

module.exports = ({ routes }) => {
  routes.post(
    '/v1/user/profile'
    ,restTokenVerify
    ,restRoleVerify([ROLES.USER.KEY])
    ,safeAsync(controller.getUserProfile)
  );

  return routes;
};
