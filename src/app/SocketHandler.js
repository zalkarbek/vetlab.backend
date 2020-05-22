const inject = new Map();

class SocketHandler {
  binding({ Container, socketIO, ...injection }) {
    this.bindingInject({ Container, socketIO, ...injection });
    socketIO.on('connect', this.onConnect.bind(this));
  }

  async onConnect(socket) {
    if(socket.payload && socket.payload.userId) {
      await this.bindingEvents({ socket });
    }
  }

  bindingInject({ Container, socketIO }) {
    inject.set('container', Container);
    inject.set('socketIO', socketIO);
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

  getInject(injectName) {
    if(inject.has(injectName)) {
      return inject.get(injectName);
    }
    return inject.get('container').getInject(injectName);
  }
  getService(name) {
    return inject.get('container').getService(name);
  }
  getSocks() {
    return this.getInject('SOCKS');
  }
  getSocksEvents() {
    return this.getSocks().EVENTS;
  }

}

module.exports = SocketHandler;
