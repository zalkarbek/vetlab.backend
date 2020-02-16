const controller = require('./auth.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.post('/v1/auth/user/login', safeAsync(controller.userAuthenticate));
  return routes;
};
