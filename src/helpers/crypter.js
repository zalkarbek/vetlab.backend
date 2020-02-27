const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../config');

const SECRET_KEY = config.crypt.secret;
const CRYPT_PRIVATE_KEY = config.crypt.privateKey;
const CRYPT_PUBLIC_KEY = config.crypt.publicKey;
const IV_LENGTH = 16;

class Crypter {
  constructor() {}

  async hashPwd(sourcePassword) {
    const salt = await bcrypt.genSalt();
    const password_hashed = await bcrypt.hash(sourcePassword, salt);
    const password_salt = salt;
    return { password_hashed, password_salt };
  }

  async validPwd(sourcePassword, hash) {
    return bcrypt.compare(sourcePassword, hash);
  }

  async encrypt(data) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(data);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  async decrypt(data) {
    let textParts = data.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}

module.exports = new Crypter();
