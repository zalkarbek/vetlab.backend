const fs = require('fs');
const crypto = require('crypto');
const uuidV4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../config/jwt');
const privateKey = fs.readFileSync('jwtRS256.key');
const publicKey = fs.readFileSync('jwtRS256.key.pub');

class TokenGenerator {
  generateTokenId() {
    const rawString = `${Date.now()}${crypto.randomBytes(16).toString('hex')}`;
    return crypto.createHash('sha256').update(rawString).digest('hex');
  }
  uid() {
    return uuidV4();
  }
  jwtSign(data) {
    return jwt.sign(data, privateKey, jwtConfig);
  }
  jwtVerify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, jwtConfig, async (err, payload) => {
        if(err) reject(err);
        resolve(payload);
      });
    });
  }
}

module.exports = new TokenGenerator();
