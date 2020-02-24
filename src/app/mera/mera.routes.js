const controller = require('./auth.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/mera/all', safeAsync(controller.create));
  routes.post('/v1/mera/create', safeAsync(controller.create));
  routes.post('/v1/mera/update', safeAsync(controller.create));
  routes.post('/v1/mera/destroy', safeAsync(controller.create));
  return routes;
};
