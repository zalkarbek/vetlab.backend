const authEvents = require('./auth/auth.events');

class Events {
  binding(injection) {
    authEvents(injection);
  }
}

module.exports = new Events();