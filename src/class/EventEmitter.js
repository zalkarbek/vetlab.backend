const Events = require('events');

class EventEmitter extends Events {
  constructor() {
    super();
  }
}

module.exports = EventEmitter;
