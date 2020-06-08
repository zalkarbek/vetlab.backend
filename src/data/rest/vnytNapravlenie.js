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
      name: 'getAllVnytNapravlenieRelPaginateEpic',
      url: `/api/v1/${routePrefix}/epic/rel/paginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getAllVnytNapravlenieRelPaginateEpic'
    },
    {
      name: 'getAllVnytNapravlenieRelPaginatePub',
      url: `/api/v1/${routePrefix}/pub/rel/paginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getAllVnytNapravlenieRelPaginatePub'
    },
  ]
};
