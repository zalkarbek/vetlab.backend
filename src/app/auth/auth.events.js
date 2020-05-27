const Container = require('../../container');
const eventEmitter = Container.getInject('eventEmitter');

class AuthEvents {
  binding(injection) {
    this.handle(injection);
  }

  handle() {
    eventEmitter.on('test', async (data) => {
      console.log('Новый пользователь подключился', data);
    });
  }
}

const authEvents = new AuthEvents();

module.exports = (injection) => {
  authEvents.binding(injection);
};
