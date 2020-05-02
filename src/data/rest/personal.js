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
  api: [ ...baseApi ]
};