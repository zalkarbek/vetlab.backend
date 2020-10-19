const tokenGenerator = require('../helpers/token-generator');
const service = require('../service');
const userService = service.getService('user');

module.exports = async (req, res, next) => {
  // проверка токена
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];

  if(token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  token = token || req.query.token || req.body.token || '';

  if(token) {
    try {
      const payload = await tokenGenerator.jwtVerify(token);
      const user = await userService.getUserByEmailWithRole(payload.email);

      if(!user && !user.email) {
        let error = new Error('Authentication Error');
        error.data = { type: 'user_not_found', message: 'User not found' };
        return next(error);
      }

      if(user.tokenId === payload.tokenId) {
        req.payload = payload;
        req.userRoles = JSON.stringify(user.roles);
        return next();
      }

      let error = new Error('Authentication Error');
      error.data = { type: 'auth_error_token_expired', message: 'Token is expired' };
      return next(error);

    } catch (e) {
      let error = new Error('Authentication Error');
      error.data = { type: 'auth_error', message: e.message };
      return next(error);
    }
  } else {
    let error = new Error('Authentication Error');
    error.data = { type: 'auth_error_token_not_found', message: 'Token not found' };
    return next(error);
  }
};
