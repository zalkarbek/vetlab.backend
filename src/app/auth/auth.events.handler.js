const Container = require('../../container');

class AuthEventsHandler extends Container {
  constructor() {
    super();
  }

  onUserLogged() {
    console.log('user logged');
  }
}

module.exports = new AuthEventsHandler();