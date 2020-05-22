const SocketHandler = require('../SocketHandler');
const handler = require('./socketHandlers');

class VnytSocket extends SocketHandler {
  async bindingEvents({ socket }) {
    await super.bindingEvents({ socket });
    const EVENTS = this.getSocksEvents();
    socket.on(EVENTS.SERVER_VNYT_NAPRAVLENIE_ACCEPT, handler.onAccept.bind(this, { socket }));
  }
}

module.exports = new VnytSocket();
