const controller = require('./vnyt.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/vnyt/napravlenie/all', safeAsync(controller.all));
  routes.get('/v1/vnyt/napravlenie/all/:id', safeAsync(controller.id));
  routes.post('/v1/vnyt/napravlenie/create', safeAsync(controller.create));
  routes.put('/v1/vnyt/napravlenie/update', safeAsync(controller.update));
  routes.delete('/v1/vnyt/napravlenie/destroy', safeAsync(controller.destroy));
  return routes;
};
