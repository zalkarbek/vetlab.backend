const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'isledovanie';
// Превикс API маршрута
const routePrefix = 'isledovanie';
// интернационализация на количество (один)
const i18nUnitOne = 'isledovanie.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'isledovanie.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    ...baseApi
  ]
};
