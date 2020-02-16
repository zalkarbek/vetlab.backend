const controller = require('./test.controller');
const asyncMiddleware = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/test/ok', asyncMiddleware(controller.get));
  return routes;
};
