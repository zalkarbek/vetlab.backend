const controller = require('./napravlenie.controller');
const restData = controller.getRestData();

module.exports = { controller, restData };
