const inject = new Map();

class AuthEventsHandler {
  constructor({ EVENTS, service }) {
    inject
      .set('EVENTS', EVENTS)
      .set('service', service);
  }
  onUserLogged() {
    console.log('user logged');
  }

}

module.exports = AuthEventsHandler;