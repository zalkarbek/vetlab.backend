
const authEvents = require('./auth/auth.events');

class Emitter {
  init(injection) {
    authEvents(injection);
  }
}

const emitter = new Emitter();

module.exports = (injection) => {
  emitter.init(injection);
};