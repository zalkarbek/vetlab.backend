const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'otdelRMaterial';
// Превикс API маршрута
const routePrefix = 'otdel/rmaterials';
// интернационализация на количество (один)
const i18nUnitOne = 'otdelRMaterial.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'otdelRMaterial.many';

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
