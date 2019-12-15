
const handler = require('./auth.socket.handler');
const { AUTH } = require('../../store/socketEvents');

module.exports = ({ guestIO }) => {
  guestIO.on('connect', (socket) => {
    socket.on(AUTH.GUEST_SERVER_LOGIN, handler.onAuthenticate({ socket }, AUTH.GUEST_CLIENT_LOGIN));
  });
};
