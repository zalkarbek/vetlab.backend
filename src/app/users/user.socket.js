const socketHandler = require('./user.socket.handler');

const socket =  {
  binding({ SOCKS, ...injection }) {
    this.handle({ SOCKS, ...injection });
    this.SOCKS = SOCKS;
  },

  handle({ socketIO }) {
    socketIO.on('connect', this.onConnect);
  },

  onConnect(socket) {
    const { EVENTS } = this.SOCKS;
    socketHandler.bindingLocalSocket({ socket });
    if(socket.payload && socket.payload.userId && socket.payload.login) {
      const { tokenId, ...payload } = socket.payload;
      socket.emit(EVENTS.USER_CLIENT_CONNECTED, payload);
    }
    socket.on(EVENTS.USER_SERVER_GET_PROFILE, socketHandler.onGetProfile);
  }
};

module.exports = (injection) => {
  socket.binding(injection);
};
