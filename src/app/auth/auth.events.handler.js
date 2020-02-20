const inject = new Map();

class AuthEventsHandler {
  constructor() {}

  binding({ EVENTS, service }) {
    inject
      .set('EVENTS', EVENTS)
      .set('service', service);
  }

  onUserLogged() {
    console.log('user logged');
  }

}

module.exports = new AuthEventsHandler();