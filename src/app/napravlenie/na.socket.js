const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');
const socketSafeAsync = SocketHandler.getMiddleware('socketSafeAsync');

class Socket extends SocketHandler {
  async bindingEvents({ socket }) {
    const EVENTS = this.getSocksEvents();
    socket.on(
      EVENTS.SERVER_NAPRAVLENIE_SEND_TO_OTDEL,
      socketSafeAsync(
        handler.onSendToOtdel.bind(this, { socket }),
        {
          socket,
          errorEvent: 'response:error',
          successEvent: EVENTS.CLIENT_NAPRAVLENIE_SEND_TO_OTDEL
        }
      )
    );
  }
}

module.exports = new Socket();
