const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');

const db = require('./db');
const jwtConfig = require('./jwt');
const jwtPrivateKey = fs.readFileSync('jwtRS256.key');
const jwtPublicKey = fs.readFileSync('jwtRS256.key.pub');

const cryptPrivateKey = fs.readFileSync('./keys/secret.key');
const cryptPublicKey = fs.readFileSync('./keys/secret.pub');

module.exports = {
  jwt: {
    config: jwtConfig,
    privateKey: jwtPrivateKey,
    publicKey: jwtPublicKey
  },
  crypt: {
    secret: process.env.SECRET_KEY,
    privateKey: cryptPrivateKey,
    publicKey: cryptPublicKey
  },
  db,
};
