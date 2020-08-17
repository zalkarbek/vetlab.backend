const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'personal';
// Превикс api маршрута
const routePrefix = 'personal';
// интернационализация на количество (один)
const i18nUnitOne = 'personal.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'personal.many';

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
      name: 'getPersonalWithUser',
      url: `/api/v1/${routePrefix}/id/withUser`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getPersonalWithUser'
    },
    {
      name: 'changePassword',
      url: `/api/v1/${routePrefix}/change-password`,
      method: 'POST',
      middleware: [],
      controllerMethod: 'changePassword'
    },

    {
      name: 'getLaborantsByOtdelId',
      url: `/api/v1/${routePrefix}/laborants`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getLaborantsByOtdelId'
    },
    {
      name: 'getChemistsByOtdelId',
      url: `/api/v1/${routePrefix}/chemists`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getChemistsByOtdelId'
    },
    {
      name: 'getSeniorsByOtdelId',
      url: `/api/v1/${routePrefix}/seniors`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getSeniorsByOtdelId'
    },
    {
      name: 'getHeadByOtdelId',
      url: `/api/v1/${routePrefix}/head`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getHeadByOtdelId'
    },
    {
      name: 'getHeadsByOtdelId',
      url: `/api/v1/${routePrefix}/heads`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getHeadsByOtdelId'
    },
  ]
};
