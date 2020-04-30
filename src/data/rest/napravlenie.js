const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'napravlenie';
// Превикс api маршрута
const routePrefix = 'napravlenie';
// интернационализация на количество (один)
const i18nUnitOne = 'napravlenie.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'napravlenie.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
