const SocketHandler = require('../SocketHandler');
const handler = require('./socket-handlers');

class UserSocket extends SocketHandler {
  async onConnectEvent(socket) {
    if(socket.payload && socket.payload.userId) {
      const EVENTS = this.getSocksEvents();
      // eslint-disable-next-line no-unused-vars
      const { tokenId, ...payload } = socket.payload;
      socket.emit(EVENTS.USER_CLIENT_CONNECTED, payload);
    }
  }

  async bindingEvents({ socket }) {
    const EVENTS = this.getSocksEvents();
    socket.on(EVENTS.USER_SERVER_GET_PROFILE, handler.userGetProfile.bind(this, { socket }));
  }
}

module.exports = new UserSocket();
