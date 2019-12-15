
const fs = require('fs');
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync('jwtRS256.key.pub');
const db = require('../db/models/index');

module.exports = async (req, res, next) => {
  // проверка токена
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
  if(token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  token = token || req.query.token || req.body.token || '';

  if(token) {
    jwt.verify(token, publicKey, async (err, payload) => {
      if(err) {
        let error = new Error('Authentication Error');
        error.data = { type: 'auth_error', message: err.message };
        return next(error);
      }
      const user = await db.User.findOne({
        where: {
          email: payload.email
        }
      });
      if(user.tokenId === payload.tokenId) {
        req.payload = payload;
        return next();
      }
      let error = new Error('Authentication Error');
      error.data = { type: 'auth_error_token_expired', message: 'Token is expired' };
      return next(error);
    });

  }else {
    let error = new Error('Authentication Error');
    error.data = { type: 'auth_error_token_not_found', message: 'Token not found' };
    return next(error);
  }
};
