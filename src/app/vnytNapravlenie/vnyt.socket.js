const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');
const socketSafeAsync = SocketHandler.getMiddleware('socketSafeAsync');

class VnytSocket extends SocketHandler {
  async bindingEvents({ socket }) {
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

    socket.on(
      EVENTS.SERVER_VNYT_NAPRAVLENIE_REJECT,
      socketSafeAsync(
        handler.onReject.bind(this, { socket }),
        {
          socket,
          errorEvent: 'response:error',
          successEvent: EVENTS.CLIENT_VNYT_NAPRAVLENIE_REJECT
        }
      )
    );
  }
}

module.exports = new VnytSocket();
