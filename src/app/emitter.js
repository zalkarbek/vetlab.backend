
const authEvents = require('./auth/auth.events');

class Emitter {
  binding(injection) {
    authEvents(injection);
  }
}
const emitter = new Emitter();

module.exports = (injection) => {
  emitter.binding(injection);
};