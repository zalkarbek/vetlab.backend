const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sPreparat';
// Превикс api маршрута
const routePrefix = 'preparat';
// интернационализация на количество (один)
const i18nUnitOne = 'preparat.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'preparat.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
