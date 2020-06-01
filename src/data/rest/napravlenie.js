const middleware = require('../../middleware');
const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'napravlenie';
// Превикс api маршрута
const routePrefix = 'napravlenie';
// интернационализация на количество (один)
const i18nUnitOne = 'napravlenie.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'napravlenie.many';

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
      name: 'allWithPosMaterial',
      url: `/api/v1/${routePrefix}/pos`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'allWithPosMaterial'
    },
    {
      name: 'allWithPosMaterialWithPaginate',
      url: `/api/v1/${routePrefix}/pos/withPaginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'allWithPosMaterialWithPaginate'
    },
    {
      name: 'allWithPosMaterialWithPaginateAndVnyt',
      url: `/api/v1/${routePrefix}/pos/withPaginateAndVnyt`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'allWithPosMaterialWithPaginateAndVnyt'
    },
    {
      name: 'sendToOtdel',
      url: `/api/v1/${routePrefix}/vnyt/sendToOtdel`,
      method: 'POST',
      middleware: [middleware.getMiddleware('restTokenVerify')],
      controllerMethod: 'sendToOtdel'
    }
  ]
};
