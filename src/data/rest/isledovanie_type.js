const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'isledovanieType';
// Превикс API маршрута
const routePrefix = 'isledovanie/types';
// интернационализация на количество (один)
const i18nUnitOne = 'isledovanieType.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'isledovanieType.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
