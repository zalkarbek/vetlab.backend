// Имя модели к которому привязан этот API
const modelName = 'user';
// Превикс API маршрута
const routePrefix = 'auth/user';
// интернационализация на количество (один)
const i18nUnitOne = 'auth.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'auth.many';

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    {
      name: 'auth.login',
      url: '/api/v1/auth/user/login',
      method: 'POST',
      middleware: [],
      controllerMethod: 'userAuthenticate'
    },
  ]
};
