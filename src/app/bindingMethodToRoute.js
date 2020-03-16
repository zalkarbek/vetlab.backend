const Container = require('../container');
const safeAsync = Container.getMiddleware('safeAsync');

module.exports = async (routeData, routes) => {
  const restData = routeData.restData;
  const controller = routeData.controller;

  restData.api.forEach((api) => {
    if(api.method === 'GET')
      routes.get(api.url, safeAsync(controller[api.controllerMethod]));

    if(api.method === 'POST')
      routes.post(api.url, safeAsync(controller[api.controllerMethod]));

    if(api.method === 'PUT')
      routes.put(api.url, safeAsync(controller[api.controllerMethod]));

    if(api.method === 'DELETE')
      routes.delete(api.url, safeAsync(controller[api.controllerMethod]));
  });
  return routes;
};
