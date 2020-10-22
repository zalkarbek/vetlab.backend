const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sRMaterial';
// Превикс API маршрута
const routePrefix = 'rmaterials';
// интернационализация на количество (один)
const i18nUnitOne = 'rmaterials.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'rmaterials.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
