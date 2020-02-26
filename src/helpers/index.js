const crypter = require('./crypter');
const rest = require('./rest');
const tokenGenerator = require('./token-generator');

class Helper {
  constructor() {
    this.helpers = {
      crypter,
      rest,
      tokenGenerator
    };
  }

  getHelper(name) {
    return this.helpers[name];
  }
}

module.exports = new Helper();