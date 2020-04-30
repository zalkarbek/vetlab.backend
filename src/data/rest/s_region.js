const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sRegion';
// Превикс API маршрута
const routePrefix = 'regions';
// интернационализация на количество (один)
const i18nUnitOne = 'region.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'region.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    ...baseApi,
    {
      name: 'getRegionsFullPathKg',
      url: `/api/v1/${routePrefix}/get/regionsFullPathKg`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getRegionsFullPathKg'
    },
    {
      name: 'getRegionsFullPathKgWithPaginate',
      url: `/api/v1/${routePrefix}/get/regionsFullPathKg/paginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getRegionsFullPathKgWithPaginate'
    },
    {
      name: 'getRegionFullPathKgById',
      url: `/api/v1/${routePrefix}/get/regionFullPathKgById`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getRegionFullPathKgById'
    }
  ]
};
