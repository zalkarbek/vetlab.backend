const emitter = require('./emitter');
const sockets = require('./socket');
const eventEmitter = require('../modules/event-module');
const { Controller } = require('./controller');

const EVENTS = require('../data/emitterData');
const SOCKS = require('../data/socketData');
const service = require('../service');

module.exports = (injection) => {
  emitter({ eventEmitter, EVENTS, SOCKS, service, ...injection });
  sockets({ eventEmitter, EVENTS, SOCKS, service, ...injection });
  Controller.binding({ eventEmitter, EVENTS, SOCKS, service, ...injection });
};