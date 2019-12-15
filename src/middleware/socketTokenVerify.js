
const fs = require('fs');
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync('jwtRS256.key.pub');
const db = require('../db/models/index');

module.exports = (socket, next) => {
  if(socket.handshake.query && socket.handshake.query.token) {
    const token = socket.handshake.query.token;

    jwt.verify(token, publicKey, async (err, payload) => {
      if(err) {
        let error = new Error('Authentication Error');
        error.data = { type: 'auth_error', message: err.message };
        next(error);
      }
      const user = await db.User.findOne({
        where: {
          email: payload.email
        }
      });
      if(user.tokenId === payload.tokenId) {
        socket.payload = payload;
        next();
      }
      let error = new Error('Authentication Error');
      error.data = { type: 'auth_error_token_expired', message: 'Token is expired' };
      next(error);
    });
  }
  const error = new Error('Forbidden');
  next(error);
};
