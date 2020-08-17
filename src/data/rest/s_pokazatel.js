const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sPokazatel';
// Превикс API маршрута
const routePrefix = 'pokazatel';
// интернационализация на количество (один)
const i18nUnitOne = 'pokazatel.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'pokazatel.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    ...baseApi,
  ]
};
