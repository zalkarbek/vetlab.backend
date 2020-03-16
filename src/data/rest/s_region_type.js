const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sRegionType';
// Превикс API маршрута
const routePrefix = 'region/type';
// интернационализация на количество (один)
const i18nUnitOne = 'region.type.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'region.type.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
