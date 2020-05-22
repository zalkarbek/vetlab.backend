const socketHandler = require('./auth.socket.handler');
const Container = require('../../container');
const SOCKS = Container.getInject('SOCKS');

class AuthSocket {
  binding(injection) {
    this.handle(injection);
  }

  handle({ socketIO }) {
    socketIO.on('connect', this.onConnect);
  }

  onConnect(socket) {
    const { EVENTS } = SOCKS;
    socketHandler.bindingLocalSocket({ socket });
    socket.emit(EVENTS.GUEST_CLIENT_CONNECTED, { message: 'Welcome Guest' });
    socket.on(EVENTS.GUEST_SERVER_LOGIN, socketHandler.onAuthenticate);
  }
}

const authSocket = new AuthSocket();

module.exports = (injection) => {
  authSocket.binding(injection);
};
