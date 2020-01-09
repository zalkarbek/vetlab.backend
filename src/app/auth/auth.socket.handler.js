
const authService = require('../../service/authService');

module.exports = {
  onAuthenticate({ socket }, clientEvent) {
    return async (data) => {
      const email = data.email || '';
      const password = data.password || '';
      const user = await authService.userAuthenticate({ email, password });
      if (!user) {
        socket.emit(clientEvent, {
          user: null,
          error: true,
          message: 'Authorization failed login or password wrong'
        });
        return ;
      }
      const token = await authService.userGetToken(user);

      socket.emit(clientEvent, {
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
  },

};
