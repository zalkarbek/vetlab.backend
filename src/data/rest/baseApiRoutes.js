
module.exports = ({ routePrefix }) => {
  return [
    {
      name: 'all',
      url: `/api/v1/${routePrefix}`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'all'
    },
    {
      name: 'create',
      url: `/api/v1/${routePrefix}/create`,
      method: 'POST',
      middleware: [],
      controllerMethod: 'create'
    },
    {
      name: 'update',
      url: `/api/v1/${routePrefix}/update`,
      method: 'PUT',
      middleware: [],
      controllerMethod: 'update'
    },
    {
      name: 'destroy',
      url: `/api/v1/${routePrefix}/destroy`,
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'destroy'
    },

    {
      name: 'id',
      url: `/api/v1/${routePrefix}/:id`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'id'
    },
    {
      name: 'id',
      url: `/api/v1/${routePrefix}/:id`,
      method: 'PUT',
      middleware: [],
      controllerMethod: 'idUpdate'
    },
    {
      name: 'id',
      url: `/api/v1/${routePrefix}/:id`,
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'idDestroy'
    },
  ];
};

