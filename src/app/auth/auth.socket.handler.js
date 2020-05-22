const Container = require('../../container');
const inject = new Map();
const authService = Container.getService('auth');
const { EVENTS } = Container.getInject('SOCKS');

class AuthSocketHandler {
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

  async onAuthenticate(data) {
    const socket = inject.get('socket');
    const email = data.email || '';
    const password = data.password || '';
    const user = await authService.userAuthenticate({ email, password });

    if (!user) {
      socket.emit(EVENTS.GUEST_CLIENT_LOGIN, {
        user: null,
        error: true,
        message: 'Authorization failed login or password wrong'
      });
      return ;
    }
    const token = await authService.userGetToken(user);
    socket.emit(EVENTS.GUEST_CLIENT_LOGIN, {
      error: false,
      message: 'Authorization success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        personal: {}
      }
    });
  }
}

module.exports = new AuthSocketHandler();
