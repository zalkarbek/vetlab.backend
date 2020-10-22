const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'rMaterialKit';
// Превикс API маршрута
const routePrefix = 'rmaterialsKit';
// интернационализация на количество (один)
const i18nUnitOne = 'rmaterialsKit.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'rmaterialsKit.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
