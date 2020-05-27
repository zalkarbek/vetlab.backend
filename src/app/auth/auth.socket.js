const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');

class AuthSocket extends SocketHandler {
  async onConnect(socket) {
    await super.onConnect(socket);
    const EVENTS = this.getSocksEvents();
    socket.emit(EVENTS.GUEST_CLIENT_CONNECTED, { message: 'Welcome Guest' });
  }

  async bindingEvents({ socket }) {
    await super.bindingEvents({ socket });
    const EVENTS = this.getSocksEvents();
    socket.on(EVENTS.GUEST_SERVER_LOGIN, handler.onAuthenticate.bind(this, { socket }));
  }
}

module.exports = new AuthSocket();
