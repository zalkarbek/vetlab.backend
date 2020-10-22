const middleware = require('../../middleware');
module.exports = ({ routePrefix }) => {
  return [
    {
      name: 'all',
      url: `/api/v1/${routePrefix}`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('isAdmin')
      ],
      controllerMethod: 'all'
    },
    {
      name: 'allPaginate',
      url: `/api/v1/${routePrefix}/paginate`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('isAdmin')
      ],
      controllerMethod: 'allPaginate'
    },
    {
      name: 'search',
      url: `/api/v1/${routePrefix}/search`,
      method: 'GET',
      middleware: [
        middleware.getMiddleware('restTokenVerify'),
        middleware.getMiddleware('isAdmin')
      ],
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
      middleware: [middleware.getMiddleware('restTokenVerify')],
      controllerMethod: 'update'
    },
    {
      name: 'destroy',
      url: `/api/v1/${routePrefix}/destroy`,
      method: 'DELETE',
      middleware: [middleware.getMiddleware('restTokenVerify')],
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
      middleware: [middleware.getMiddleware('restTokenVerify')],
      controllerMethod: 'idUpdate'
    },
    {
      name: 'id',
      url: `/api/v1/${routePrefix}/id`,
      method: 'DELETE',
      middleware: [middleware.getMiddleware('restTokenVerify')],
      controllerMethod: 'idDestroy'
    },
  ];
};

