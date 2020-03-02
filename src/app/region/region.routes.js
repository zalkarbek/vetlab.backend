const controller = require('./region.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {

  routes.get('/v1/regions/types', safeAsync(controller.getRegionTypes));
  routes.get('/v1/regions/types/:id', safeAsync(controller.getRegionTypeById));
  routes.post('/v1/regions/types/create', safeAsync(controller.createRegionType));
  routes.put('/v1/regions/types/update', safeAsync(controller.updateRegionType));
  routes.delete('/v1/regions/types/destroy', safeAsync(controller.destroyRegionType));

  routes.get('/v1/regions', safeAsync(controller.getRegions));
  routes.get('/v1/regions/:id', safeAsync(controller.getRegionById));
  routes.post('/v1/regions/create', safeAsync(controller.createRegion));
  routes.put('/v1/regions/update', safeAsync(controller.updateRegion));
  routes.delete('/v1/regions/destroy', safeAsync(controller.destroyRegion));
  return routes;
};
