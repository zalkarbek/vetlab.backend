const { Handler } = require('../handler');
const inject = new Map();

class UserSocketHandler extends Handler {

  bindingLocalSocket({ socket }) {
    inject.set('socket', socket);
    socket.on('disconnect', this.onDisconnect);
    socket.on('disconnecting', this.onDisconnecting);
  }

  onDisconnect() {
    inject.get('socket').removeAllListeners();
  }
  onDisconnecting() {
    inject.get('socket').removeAllListeners();
  }

  async onGetProfile() {
    return { name: 'Zalkarbek' };
  }
}

module.exports = new UserSocketHandler();
