const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sOtdelenia';
// Превикс API маршрута
const routePrefix = 'otdelenia';
// интернационализация на количество (один)
const i18nUnitOne = 'otdelenia.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'otdelenia.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
