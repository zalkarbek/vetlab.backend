const authRoutes = require('./auth/auth.routes');
const optionRoutes = require('./option/opt.routes');
const userRoutes = require('./user/user.routes');
const rolesRoutes = require('./roles/roles.routes');
const testRoutes = require('./test/test.routes');

const regionRoutes = require('./region/region.routes');
const personalRoutes = require('./personal/personal.routes');
const meraRoutes = require('./mera/mera.routes');

module.exports = ({ routes }) => {
  routes.use('/api', authRoutes({ routes }));
  routes.use('/api', optionRoutes({ routes }));
  routes.use('/api', userRoutes({ routes }));
  routes.use('/api', rolesRoutes({ routes }));
  routes.use('/api', testRoutes({ routes }));

  routes.use('/api', regionRoutes({ routes }));
  routes.use('/api', personalRoutes({ routes }));
  routes.use('/api', meraRoutes({ routes }));

  return routes;
};
