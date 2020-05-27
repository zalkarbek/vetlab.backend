module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const authService = this.getService('auth');
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
};
