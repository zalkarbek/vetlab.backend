const controller = require('./user.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
