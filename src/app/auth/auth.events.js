const handler = require('./auth.events.handler');
const Container = require('../../container');
const eventEmitter = Container.getInject('eventEmitter');
const EVENTS = Container.getInject('EVENTS');

class AuthEvents {
  binding(injection) {
    this.handle(injection);
  }

  handle() {
    eventEmitter.on(EVENTS.USER_LOGGED_IN, handler.onUserLogged);
    eventEmitter.on('test', async (data) => {
      console.log('Новый пользователь подключился', data);
    });
  }
}

const authEvents = new AuthEvents();

module.exports = (injection) => {
  authEvents.binding(injection);
};