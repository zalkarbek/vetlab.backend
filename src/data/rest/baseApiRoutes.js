const middleware = require('../../middleware');
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
      name: 'allPaginate',
      url: `/api/v1/${routePrefix}/paginate`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'allPaginate'
    },
    {
      name: 'search',
      url: `/api/v1/${routePrefix}/search`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'search'
    },
    {
      name: 'create',
      url: `/api/v1/${routePrefix}/create`,
      method: 'POST',
      middleware: [middleware.getMiddleware('restTokenVerify')],
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
      url: `/api/v1/${routePrefix}/id`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'id'
    },
    {
      name: 'id',
      url: `/api/v1/${routePrefix}/id`,
      method: 'PUT',
      middleware: [],
      controllerMethod: 'idUpdate'
    },
    {
      name: 'id',
      url: `/api/v1/${routePrefix}/id`,
      method: 'DELETE',
      middleware: [],
      controllerMethod: 'idDestroy'
    },
  ];
};

