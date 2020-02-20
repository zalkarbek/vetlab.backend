const handler = require('./auth.events.handler');

class AuthEvents {
  binding(injection) {
    handler.binding(injection);
    this.handle(injection);
  }

  handle({ EVENTS, eventEmitter }) {
    eventEmitter.on(EVENTS.USER_LOGGED_IN, handler.onUserLogged);
    eventEmitter.on('test', (data) => {
      console.log('Персонал подключился', data);
    });
  }
}

const authEvents = new AuthEvents();

module.exports = (injection) => {
  authEvents.binding(injection);
};