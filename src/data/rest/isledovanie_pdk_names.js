const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'isledovaniePdkName';
// Превикс API маршрута
const routePrefix = 'isledovanie/pdk/names';
// интернационализация на количество (один)
const i18nUnitOne = 'isledovaniePdkName.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'isledovaniePdkName.many';

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
