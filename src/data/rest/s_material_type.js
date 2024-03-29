const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sMaterialType';
// Превикс API маршрута
const routePrefix = 'material/type';
// интернационализация на количество (один)
const i18nUnitOne = 'materialType.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'materialType.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
