
const AuthSocketHandler = require('./auth.socket.handler');

class AuthSocket {
  binding({ SOCKS, ...injection }) {
    this.authSocketHandler = new AuthSocketHandler({ SOCKS, ...injection });
    this.handle({ SOCKS, ...injection });
    this.SOCKS = SOCKS;
  }
  handle({ socketIO }) {
    socketIO.on('connect', this.onConnect);
  }
  onConnect(socket) {
    const { EVENTS } = this.SOCKS;
    this.authSocketHandler.init({ socket });
    socket.emit(EVENTS.GUEST_CLIENT_CONNECTED, { message: 'Welcome Guest' });
    socket.on(EVENTS.GUEST_SERVER_LOGIN, this.authSocketHandler.onAuthenticate);
  }
}

const authSocket = new AuthSocket();

module.exports = (injection) => {
  authSocket.binding(injection);
};
