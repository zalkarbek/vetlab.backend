// Имя модели к которому привязан этот API
const modelName = 'user';
// Превикс API маршрута
const routePrefix = 'users';
// интернационализация на количество (один)
const i18nUnitOne = 'user.one';
// интернационализация на количество (несколько)
const i18nUnitMany = 'user.many';

module.exports = {
  modelName,
  routePrefix,
  i18nUnitOne,
  i18nUnitMany,
  api: [
    {
      name: 'all',
      url: '/api/v1/users',
      method: 'GET',
      middleware: [],
      controllerMethod: 'all'
    },
    {
      name: 'getAllPaginate',
      url: '/api/v1/users/paginate',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getAllPaginate'
    },
    {
      name: 'getUsersWithRoles',
      url: '/v1/users/with/role',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getUsersWithRoles'
    },
    {
      name: 'getUsersWithPersonal',
      url: '/v1/users/with/personal',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getUsersWithPersonal'
    },
    {
      name: 'id',
      url: '/v1/users/:id',
      method: 'GET',
      middleware: [],
      controllerMethod: 'id'
    },
    {
      name: 'update',
      url: '/v1/users/:id/update',
      method: 'PUT',
      middleware: [],
      controllerMethod: 'update'
    },
    {
      name: 'destroy',
      url: '/v1/users/:id/destroy',
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'destroy'
    },

    {
      name: 'getRoles',
      url: '/v1/users/:id/roles/get',
      method: 'GET',
      middleware: [],
      controllerMethod: 'getRoles'
    },

    {
      name: 'addRoles',
      url: '/v1/users/:id/roles/add',
      method: 'POST',
      middleware: [],
      controllerMethod: 'addRoles'
    },

    {
      name: 'removeRoles',
      url: '/v1/users/:id/roles/remove',
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'removeRoles'
    },

    {
      name: 'create',
      url: '/v1/users/create',
      method: 'POST',
      middleware: [],
      controllerMethod: 'create'
    },

    {
      name: 'update',
      url: '/v1/users/update',
      method: 'PUT',
      middleware: [],
      controllerMethod: 'update'
    },

    {
      name: 'destroy',
      url: '/v1/users/destroy',
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'destroy'
    },
  ]
};
