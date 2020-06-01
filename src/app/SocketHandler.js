const Handler = require('./Handler');

class SocketHandler extends Handler {
  binding({ socketIO }) {
    socketIO.on('connect', this.onConnect.bind(this));
  }

  async onConnect(socket) {
    await this.onConnectEvent(socket);
    if(socket.payload && socket.payload.userId) {
      await this.bindingDisconnectEvents({ socket });
      await this.bindingEvents({ socket });
    }
  }

  async onConnectEvent() {}

  async bindingDisconnectEvents({ socket }) {
    socket.on('disconnect', this.onDisconnect.bind(this, { socket }));
    socket.on('disconnecting', this.onDisconnecting.bind(this, { socket }));
  }

  onDisconnect({ socket }) {
    socket.removeAllListeners();
  }
  onDisconnecting({ socket }) {
    socket.removeAllListeners();
  }
}

module.exports = SocketHandler;
