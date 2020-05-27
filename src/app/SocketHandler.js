const Handler = require('./Handler');

class SocketHandler extends Handler {
  binding({ socketIO }) {
    socketIO.on('connect', this.onConnect.bind(this));
  }

  async onConnect(socket) {
    if(socket.payload && socket.payload.userId) {
      await this.bindingEvents({ socket });
    }
  }

  async bindingEvents({ socket }) {
    socket.on('disconnect', this.onDisconnect({ socket }));
    socket.on('disconnecting', this.onDisconnecting({ socket }));
  }

  onDisconnect({ socket }) {
    return () => {
      socket.removeAllListeners();
    };
  }
  onDisconnecting({ socket }) {
    return () => {
      socket.removeAllListeners();
    };
  }
}

module.exports = SocketHandler;
