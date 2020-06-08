const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');
const socketSafeAsync = SocketHandler.getMiddleware('socketSafeAsync');

class VnytSocket extends SocketHandler {
  async bindingEvents({ socket }) {
    const EVENTS = this.getSocksEvents();
    socket.on(
      EVENTS.SERVER_FINISH_ISLEDOVANIE,
      socketSafeAsync(
        handler.onIsledovanieFinish.bind(this, { socket }),
        {
          socket,
          errorEvent: 'response:error',
          successEvent: EVENTS.CLIENT_FINISH_ISLEDOVANIE
        }
      )
    );
  }
}

module.exports = new VnytSocket();
