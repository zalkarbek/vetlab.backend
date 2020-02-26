const controller = require('./region.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/region/all', safeAsync(controller.getRegions));
  routes.get('/v1/region/all/:id', safeAsync(controller.getRegionById));
  routes.post('/v1/region/create', safeAsync(controller.createRegion));
  routes.put('/v1/region/update', safeAsync(controller.updateRegion));
  routes.delete('/v1/region/destroy', safeAsync(controller.destroyRegion));

  routes.get('/v1/region/type/all', safeAsync(controller.getRegionTypes));
  routes.get('/v1/region/type/all/:id', safeAsync(controller.getRegionTypeById));
  routes.post('/v1/region/type/create', safeAsync(controller.createRegionType));
  routes.put('/v1/region/type/update', safeAsync(controller.updateRegionType));
  routes.delete('/v1/region/type/destroy', safeAsync(controller.destroyRegionType));
  return routes;
};
