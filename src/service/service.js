const tokenGenerator = require('../helpers/token-generator');
const lodash = require('lodash');
const { Kernel } = require('../app/kernel');

class Service extends Kernel {
  constructor() {
    super();
    this.tokenGenerator = tokenGenerator;
    this._ = lodash;
  }

  static bind({ db }) {
    this.db = db;
  }
}

module.exports.Service = Service;
