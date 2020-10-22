const baseApiRoutes = require('./baseApiRoutes');
const middleware = require('../../middleware');
// Имя модели к которому привязан этот API
const modelName = 'sPokazatelPdk';
// Превикс API маршрута
const routePrefix = 'pokazatelPdk';
// интернационализация на количество (один)
const i18nUnitOne = 'pokazatelPdk.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'pokazatelPdk.many';

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
      name: 'getPdkByPokazatelAndMaterial',
      url: `/api/v1/${routePrefix}/getPdkByPokazatelAndMaterial`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('isAdmin')
      ],
      controllerMethod: 'getPdkByPokazatelAndMaterial'
    },
  ]
};
