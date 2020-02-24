const events = require('./app/events');
const sockets = require('./app/socket');
const Container = require('./container');

module.exports = (injection) => {
  Container.binding(injection);
  events.binding(injection);
  sockets.binding(injection);
};