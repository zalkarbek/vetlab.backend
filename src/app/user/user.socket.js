const SocketHandler = require('../SocketHandler');
const handler = require('./socketHandlers');

class UserSocket extends SocketHandler {
  async onConnect(socket) {
    super.onConnect(socket);
    if(socket.payload && socket.payload.userId) {
      const SOCKS = this.getSocks();
      const { EVENTS } = SOCKS;
      // eslint-disable-next-line no-unused-vars
      const { tokenId, ...payload } = socket.payload;
      socket.emit(EVENTS.USER_CLIENT_CONNECTED, payload);
    }
  }

  async bindingEvents({ socket }) {
    await super.bindingEvents({ socket });
    const EVENTS = this.getSocksEvents();
    socket.on(EVENTS.USER_SERVER_GET_PROFILE, handler.userGetProfile.bind(this, { socket }));
  }
}

module.exports = new UserSocket();
