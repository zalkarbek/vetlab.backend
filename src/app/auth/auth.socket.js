
const socketHandler = require('./auth.socket.handler');

class AuthSocket {
  binding({ SOCKS, ...injection }) {
    socketHandler.binding({ SOCKS, ...injection });
    this.handle({ SOCKS, ...injection });
    this.SOCKS = SOCKS;
  }
  handle({ socketIO }) {
    socketIO.on('connect', this.onConnect);
  }
  onConnect(socket) {
    const { EVENTS } = this.SOCKS;
    socketHandler.bindingLocalSocket({ socket });

    socket.emit(EVENTS.GUEST_CLIENT_CONNECTED, { message: 'Welcome Guest' });
    socket.on(EVENTS.GUEST_SERVER_LOGIN, socketHandler.onAuthenticate);
  }
}

const authSocket = new AuthSocket();

module.exports = (injection) => {
  authSocket.binding(injection);
};
