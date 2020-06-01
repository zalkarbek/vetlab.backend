const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'otdel';
// Превикс API маршрута
const routePrefix = 'otdel';
// интернационализация на количество (один)
const i18nUnitOne = 'otdel.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'otdel.many';

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
      name: 'getWithOtdelenia',
      url: `/api/v1/${routePrefix}/with/otdelenia`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getWithOtdelenia'
    },
    {
      name: 'getWithNonSpec',
      url: `/api/v1/${routePrefix}/with/nonspec`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getWithNonSpec'
    },
  ]
};
