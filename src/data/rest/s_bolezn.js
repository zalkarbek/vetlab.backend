const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sBolezn';
// Превикс API маршрута
const routePrefix = 'bolezn';
// интернационализация на количество (один)
const i18nUnitOne = 'bolezn.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'bolezn.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
