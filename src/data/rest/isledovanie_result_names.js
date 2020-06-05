const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'isledovanieResultName';
// Превикс API маршрута
const routePrefix = 'isledovanie/result/names';
// интернационализация на количество (один)
const i18nUnitOne = 'isledovanieResultName.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'isledovanieResultName.many';

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
