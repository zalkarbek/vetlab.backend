const i18n = require('../i18n');

class REST {
  responseWith({ unit, message, data = {} }) {
    return {
      error: false,
      message: i18n.t(message, { unit: i18n.t(unit) }),
      data
    };
  }

  response({ message, data = {} }) {
    return {
      error: false,
      message: i18n.t(message),
      data
    };
  }
}

module.exports = new REST();