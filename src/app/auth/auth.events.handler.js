class AuthEventsHandler {
  constructor({ EVENTS, service }) {
    this.EVENTS = EVENTS;
    this.service = service;
  }
  onUserLogged() {
    console.log('user logged');
  }
}

module.exports = AuthEventsHandler;