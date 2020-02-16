const controller = require('./personal.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');

module.exports = ({ routes }) => {
  routes.post('/v1/personal/create', restTokenVerify, restRoleVerify(['admin']), safeAsync(controller.create));
  return routes;
};
