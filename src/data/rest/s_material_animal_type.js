const baseApiRoutes = require('./baseApiRoutes');
// Имя модели к которому привязан этот API
const modelName = 'sMaterialAnimalType';
// Превикс API маршрута
const routePrefix = 'material/animal/type';
// интернационализация на количество (один)
const i18nUnitOne = 'animal.type.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'animal.type.many';

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ modelName, routePrefix });

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [ ...baseApi ]
};
