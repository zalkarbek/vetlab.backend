
const handler = require('./user.socket.handler');
const SOCKET_EVENT = require('../../store/socketEvents');
const { USER } = SOCKET_EVENT;

module.exports = ({ userIO, socketIO, httpServer, socketClient, app }) => {
  userIO.on('connect', (socket) => {

    if(socket.payload && socket.payload.userId && socket.payload.login) {
      // eslint-disable-next-line no-unused-vars
      const { tokenId, ...payload } = socket.payload;
      socket.emit(USER.USER_CLIENT_CONNECTED, payload);
    }
    socket.on(USER.USER_SERVER_GET_PROFILE, handler.onGet({ socket }, USER.USER_CLIENT_GET_PROFILE));
  });
};
