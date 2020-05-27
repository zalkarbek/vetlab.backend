const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');
const socketSafeAsync = SocketHandler.getMiddleware('socketSafeAsync');

class VnytSocket extends SocketHandler {
  async bindingEvents({ socket }) {
    await super.bindingEvents({ socket });
    const EVENTS = this.getSocksEvents();
    socket.on(
      EVENTS.SERVER_VNYT_NAPRAVLENIE_ACCEPT,
      socketSafeAsync(
        handler.onAccept.bind(this, { socket }),
        {
          socket,
          errorEvent: 'response:error',
          successEvent: EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS
        }
      )
    );
  }
}

module.exports = new VnytSocket();
