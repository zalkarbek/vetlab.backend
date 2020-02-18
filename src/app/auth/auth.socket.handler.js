const inject = new Map();

class AuthSocketHandler {
  constructor({ service, SOCKS, ...injection }) {
    inject
      .set('inject', injection)
      .set('SOCKS', SOCKS)
      .set('service', service);
  }

  init({ socket }) {
    inject.set('socket', socket);
  }
  onDisconnect() {
    inject.get('socket').removeAllListeners();
  }
  onDisconnecting() {
    inject.get('socket').removeAllListeners();
  }

  async onAuthenticate(data) {
    const authService = inject.get('service').getService('auth');

    const { EVENTS } = inject.get('SOCKS');
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

module.exports = AuthSocketHandler;
