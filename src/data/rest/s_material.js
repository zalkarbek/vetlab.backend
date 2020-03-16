const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sMaterial';
// Превикс API маршрута
const routePrefix = 'material';
// интернационализация на количество (один)
const i18nUnitOne = 'material.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'material.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
