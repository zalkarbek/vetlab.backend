const controller = require('./personal.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');

module.exports = ({ routes }) => {
  routes.post(
    '/v1/personal/profile'
    ,restTokenVerify
    ,restRoleVerify(['admin'])
    ,safeAsync(controller.getPersonalProfile)
  );

  routes.get('/v1/personal/all', safeAsync(controller.all));
  routes.get('/v1/personal/all/:id', safeAsync(controller.id));
  routes.post('/v1/personal/create', safeAsync(controller.create));
  routes.put('/v1/personal/update', safeAsync(controller.update));
  routes.delete('/v1/personal/destroy', safeAsync(controller.destroy));
  return routes;
};
