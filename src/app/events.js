const userEvents = require('./user/user-events');
const Handler = require('./Handler');

class Events {
  async binding() {
    const eventEmitter = Handler.getInject('eventEmitter');
    await userEvents.bindingEvents({ eventEmitter });
  }
}

module.exports = new Events();
