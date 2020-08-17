const middleware = require('../../middleware');
const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'vnytNapravlenie';
// Превикс api маршрута
const routePrefix = 'napravlenie/vnyt';
// интернационализация на количество (один)
const i18nUnitOne = 'vnytNapravlenie.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'vnytNapravlenie.many';

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
      name: 'getAllRelPaginateEpic',
      url: `/api/v1/${routePrefix}/epic/rel/paginate`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('restAdminVerify')
      ],
      controllerMethod: 'getAllRelPaginateEpic'
    },
    {
      name: 'getAllRelPaginatePub',
      url: `/api/v1/${routePrefix}/pub/rel/paginate`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('restAdminVerify')
      ],
      controllerMethod: 'getAllRelPaginatePub'
    },
    {
      name: 'getLastByNomerToOtdel',
      url: `/api/v1/${routePrefix}/lastByNomerToOtdel`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('restAdminVerify')
      ],
      controllerMethod: 'getLastByNomerToOtdel'
    },
  ]
};
