const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sDojlnost';
// Превикс API маршрута
const routePrefix = 'doljnost';
// интернационализация на количество (один)
const i18nUnitOne = 'doljnost.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'doljnost.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
