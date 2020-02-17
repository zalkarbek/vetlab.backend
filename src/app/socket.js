
const { NAMESPACES } = require('../data/socketData');
const userSocket = require('./users/user.socket');
const authSocket = require('./auth/auth.socket');
const socketTokenVerify = require('../middleware/socketTokenVerify');

module.exports = (socketServer, httpServer, socketClient, app) => {

  const authIO = socketServer.of(NAMESPACES.AUTHORIZED);
  const guestIO = socketServer.of(NAMESPACES.GUEST);

  //MIDDLEWARE
  // socketServer.sockets.use(socketBaseSecure);
  authIO.use(socketTokenVerify);

  // HANDLING
  authSocket({ socketIO:guestIO, socketServer, httpServer, socketClient, app });
  // Канал авторизованных пользователей
  userSocket({ socketIO:authIO, socketServer, httpServer, socketClient, app });
};
