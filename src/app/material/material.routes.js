const controller = require('./material.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/material/all', safeAsync(controller.all));
  routes.get('/v1/material/all/:id', safeAsync(controller.id));
  routes.post('/v1/material/create', safeAsync(controller.create));
  routes.post('/v1/material/update', safeAsync(controller.update));
  routes.post('/v1/material/destroy', safeAsync(controller.destroy));
  return routes;
};
