const controller = require('./plan.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
