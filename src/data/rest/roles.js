// Имя модели к которому привязан этот API
const modelName = 'role';
// Превикс API маршрута
const routePrefix = 'roles';
// интернационализация на количество (один)
const i18nUnitOne = 'role.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'role.many';

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    {
      name: 'all',
      url: '/api/v1/roles',
      method: 'GET',
      middleware: [],
      controllerMethod: 'all'
    },

    {
      name: 'id',
      url: '/api/v1/roles/id',
      method: 'GET',
      middleware: [],
      controllerMethod: 'id'
    },

    {
      name: 'getUsers',
      url: '/api/v1/roles/id/users',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getUsers'
    },

    {
      name: 'addUsers',
      url: '/api/v1/roles/id/users/add',
      method: 'POST',
      middleware: [],
      controllerMethod: 'addUsers'
    },

    {
      name: 'create',
      url: '/api/v1/roles/create',
      method: 'POST',
      middleware: [],
      controllerMethod: 'create'
    },

    {
      name: 'update',
      url: '/api/v1/roles/update',
      method: 'PUT',
      middleware: [],
      controllerMethod: 'update'
    },

    {
      name: 'destroy',
      url: '/api/v1/roles/destroy',
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'destroy'
    }
  ]
};
