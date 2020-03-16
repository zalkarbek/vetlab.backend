const bindMethodToRoute = require('./bindingMethodToRoute');
const authRoutes = require('./auth/auth.routes');
const optionRoutes = require('./option/opt.routes');
const userRoutes = require('./user/user.routes');
const rolesRoutes = require('./roles/roles.routes');
const boleznRoutes = require('./bolezn/bolezn.routes');
const doljnostRoutes = require('./doljnost/doljnost.routes');
const materialRoutes = require('./material/material.routes');
const materialAnimalTypeRoutes = require('./materialAnimalType/materialAnimalType.routes');
const materialTypeRoutes = require('./materialType/materialType.routes');
const meraRoutes = require('./mera/mera.routes');
const metodRoutes = require('./metod/metod.routes');
const otdeleniaRoutes = require('./otdelenia/otdelenia.routes');
const pokazatelRoutes = require('./otdelenia/otdelenia.routes');
const regionTypeRoutes = require('./regionType/regionType.routes');
const regionRoutes = require('./region/region.routes');

module.exports = async ({ routes }) => {

  await bindMethodToRoute(optionRoutes, routes);
  await bindMethodToRoute(authRoutes, routes);
  await bindMethodToRoute(userRoutes, routes);
  await bindMethodToRoute(rolesRoutes, routes);
  await bindMethodToRoute(boleznRoutes, routes);
  await bindMethodToRoute(doljnostRoutes, routes);
  await bindMethodToRoute(materialAnimalTypeRoutes, routes);
  await bindMethodToRoute(materialTypeRoutes, routes);
  await bindMethodToRoute(materialRoutes, routes);
  await bindMethodToRoute(meraRoutes, routes);
  await bindMethodToRoute(metodRoutes, routes);
  await bindMethodToRoute(otdeleniaRoutes, routes);
  await bindMethodToRoute(pokazatelRoutes, routes);
  await bindMethodToRoute(regionTypeRoutes, routes);
  await bindMethodToRoute(regionRoutes, routes);
  return routes;
};
