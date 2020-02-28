const controller = require('./napravlenie.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/napravlenie/all', safeAsync(controller.all));
  routes.get('/v1/napravlenie/all/:id', safeAsync(controller.id));
  routes.post('/v1/napravlenie/create', safeAsync(controller.create));
  routes.put('/v1/napravlenie/update', safeAsync(controller.update));
  routes.delete('/v1/napravlenie/destroy', safeAsync(controller.destroy));
  return routes;
};
