const bcrypt = require('bcryptjs');

class Crypter {
  async hashPwd(pwd) {
    const salt = await bcrypt.genSalt();
    const password_hashed = await bcrypt.hash(pwd, salt);
    const password_salt = salt;
    return { password_hashed, password_salt };
  }

  async validPwd(sourcePassword, hash) {
    return bcrypt.compare(sourcePassword, hash);
  }
}

module.exports = new Crypter();
