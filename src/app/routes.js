const authRoutes = require('./auth/auth.routes');
const optionRoutes = require('./option/opt.routes');
const userRoutes = require('./users/user.routes');
const testRoutes = require('./test/test.routes');

module.exports = ({ root, routes }) => {
  routes.use('/api', authRoutes({ root, routes }));
  routes.use('/api', optionRoutes({ root, routes }));
  routes.use('/api', userRoutes({ root, routes }));
  routes.use('/api', testRoutes({ root, routes }));
  return routes;
};
