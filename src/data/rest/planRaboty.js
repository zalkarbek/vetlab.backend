const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'plan';
// Превикс API маршрута
const routePrefix = 'plan';
// интернационализация на количество (один)
const i18nUnitOne = 'plan.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'plan.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
