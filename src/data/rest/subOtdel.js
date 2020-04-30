const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API в ORM
const modelName = 'subOtdel';
// Превикс API маршрута
const routePrefix = 'otdel/sub';
// интернационализация на количество (один)
const i18nUnitOne = 'subOtdel.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'subOtdel.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
