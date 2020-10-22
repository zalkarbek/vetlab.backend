const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sRMetod';
// Превикс API маршрута
const routePrefix = 'rmetod';
// интернационализация на количество (один)
const i18nUnitOne = 'rmetod.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'rmetod.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
