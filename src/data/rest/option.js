// Имя модели к которому привязан этот API
const modelName = 'opt';
// Превикс API маршрута
const routePrefix = 'option';
// интернационализация на количество (один)
const i18nUnitOne = 'option.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'option.many';

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    {
      name: 'getSocketEvents',
      url: '/api/v1/option/socketEvents',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getSocketEvents'
    },

    {
      name: 'getSocks',
      url: '/api/v1/option/socks',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getSocks'
    },

    {
      name: 'getModelFields',
      url: '/api/v1/option/model/fields',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getModelFields'
    },
  ]
};
