const controller = require('./user.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');


module.exports = ({ routes }) => {
  routes.post('/v1/user/profile', restTokenVerify, restRoleVerify(['user']), safeAsync(controller.getUserProfile));
  return routes;
};
