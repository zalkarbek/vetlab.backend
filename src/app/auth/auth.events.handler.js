const { Handler } = require('../handler');

class AuthEventsHandler extends Handler {
  constructor() {
    super();
  }

  onUserLogged() {
    console.log('user logged');
  }
}

module.exports = new AuthEventsHandler();