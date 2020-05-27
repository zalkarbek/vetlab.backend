const EventHandler = require('../EventHandler');
const handler = require('./event-handlers');

class UserEvents extends EventHandler {
  async bindingEvents({ eventEmitter }) {
    await super.bindingEvents({ eventEmitter });
    const LOCAL_EVENTS = this.getLocalEvents();
    eventEmitter.on(LOCAL_EVENTS.ON_USER_LOGIN, handler.onUserLogin.bind(this));
  }
}

module.exports = new UserEvents();
