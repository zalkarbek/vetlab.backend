const controller = require('./opt.controller');
const safeAsync = require('../../middleware/async');
// const jwtVerify = require('../../middleware/restTokenVerify');

module.exports = ({ routes }) => {
  routes.get('/v1/option/socketEvents', safeAsync(controller.getSocketEvents));
  routes.get('/v1/option/model/fields', safeAsync(controller.getModelFields));
  return routes;
};
