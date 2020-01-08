
const handler = require('./auth.socket.handler');
const { EVENTS } = require('../../data/socketData');
const { AUTH } = EVENTS;

module.exports = ({ guestIO }) => {
  guestIO.on('connect', (socket) => {
    socket.emit(AUTH.GUEST_CLIENT_CONNECTED, { message: 'Welcome Guest' });
    socket.on(AUTH.GUEST_SERVER_LOGIN, handler.onAuthenticate({ socket }, AUTH.GUEST_CLIENT_LOGIN));
  });
};
