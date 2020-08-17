// const middleware = require('../../middleware');
const modelName = 'otdel';
const routePrefix = 'report/isledovanie';

module.exports = {
  modelName,
  routePrefix,
  api: [
    {
      name: 'getIsledovanieData',
      url: `/api/v1/${routePrefix}/data`,
      method: 'GET',
      middleware: [],
      controllerMethod: 'getIsledovanieData'
    },
    {

    }
  ]
};
