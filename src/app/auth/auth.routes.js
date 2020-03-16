const controller = require('./auth.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
