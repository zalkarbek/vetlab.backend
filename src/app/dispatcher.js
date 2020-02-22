const events = require('./events');
const sockets = require('./socket');
const service = require('../service');
const { Kernel } = require('./kernel');

const eventEmitter = require('../modules/event-module');
const { EVENTS } = require('../data/eventData');
const SOCKS = require('../data/socketData');
const db = require('../db/models/index');
const pathResolve = require( '../../pathResolve');

module.exports = (injection) => {
  Kernel.binding({ eventEmitter, EVENTS, SOCKS, service , pathResolve , db, ...injection });
  service.binding({ eventEmitter, EVENTS, SOCKS, service , pathResolve , db, ...injection });
  events.binding({ eventEmitter, EVENTS, SOCKS, service , pathResolve , db, ...injection });
  sockets.binding({ eventEmitter, EVENTS, SOCKS, service , pathResolve , db, ...injection });
};