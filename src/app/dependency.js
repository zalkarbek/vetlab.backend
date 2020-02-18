
const emitter = require('./emitter');
const sockets = require('./socket');
const eventEmitter = require('../modules/event-module');
const EVENTS = require('../data/emitterData');
const SOCKS = require('../data/socketData');
const services = require('../service');

module.exports = (injection) => {
  emitter({ eventEmitter, EVENTS, SOCKS, services, ...injection });
  sockets({ eventEmitter, EVENTS, SOCKS, services, ...injection });
};