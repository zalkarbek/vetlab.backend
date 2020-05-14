const crypter = require('./crypter');
const rest = require('./rest');
const tokenGenerator = require('./token-generator');
const asyncForEach = require('./asyncForEach');

class Helper {
  constructor() {
    this.helpers = {
      crypter,
      rest,
      tokenGenerator,
      asyncForEach
    };
  }

  getHelper(name) {
    return this.helpers[name];
  }
}

module.exports = new Helper();
