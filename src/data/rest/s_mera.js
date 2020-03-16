const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sMera';
// Превикс api маршрута
const routePrefix = 'mera';
// интернационализация на количество (один)
const i18nUnitOne = 'unit.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'unit.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
