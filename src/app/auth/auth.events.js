const AuthEventHandler = require('./auth.events.handler');

class AuthEvents {
  binding(injection) {
    this.handler = new AuthEventHandler(injection);
    this.handle(injection);
  }

  handle({ EVENTS, eventEmitter }) {
    eventEmitter.on(EVENTS.USER_LOGGED_IN, this.handler.onUserLogged);
  }
}

const authEvents = new AuthEvents();

module.exports = (injection) => {
  authEvents.binding(injection);
};