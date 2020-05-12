// Имя модели к которому привязан этот API
const modelName = 'posMaterial';
// Превикс API маршрута
const routePrefix = 'posMaterial';
// интернационализация на количество (один)
const i18nUnitOne = 'posMaterial.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'posMaterial.many';

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    {
      name: 'allPaginate',
      url: `/api/v1/${routePrefix}/paginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'allPaginate'
    },
    {
      name: 'all',
      url: `/api/v1/${routePrefix}`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'all'
    },
    {
      name: 'search',
      url: `/api/v1/${routePrefix}/search`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'search'
    },
  ]
};
