// const middleware = require('../../middleware');
const modelName = 'otdel';
const routePrefix = 'report/otdel';

module.exports = {
  modelName,
  routePrefix,
  api: [
    {
      name: 'getOtdelData',
      url: `/api/v1/${routePrefix}/data`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getOtdelData'
    },
    {

    }
  ]
};
