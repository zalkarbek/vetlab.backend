
const tokenGenerator = require('../helpers/token-generator');
const userService = require('../service/userService');

module.exports = async (socket, next) => {
  if(socket.handshake.query && socket.handshake.query.token) {
    const token = socket.handshake.query.token;
    try {
      const payload = await tokenGenerator.jwtVerify(token);
      const user = await userService.getUserByEmailWithRole(payload.email);

      if(!user && !user.email) {
        let error = new Error('Authentication Error');
        error.data = { type: 'user_not_found', message: 'User not found' };
        next(error);
      }

      if(user.tokenId === payload.tokenId) {
        socket.payload = payload;
        socket.userRoles = JSON.stringify(user.roles);
        next();
      } else {
        let error = new Error('Authentication Error');
        error.data = { type: 'auth_error_token_expired', message: 'Token is expired' };
        next(error);
      }

    } catch (e) {
      let error = new Error('Authentication Error');
      error.data = { type: 'auth_error', message: e.message };
      next(error);
    }
  }
  const error = new Error('Forbidden');
  next(error);
};
