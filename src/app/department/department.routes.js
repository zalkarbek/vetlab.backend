const controller = require('./department.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
