const controller = require('./personal.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
