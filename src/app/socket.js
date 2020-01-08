
const { NAMESPACES } = require('../data/socketData');
const userSocket = require('./users/user.socket');
const authSocket = require('./auth/auth.socket');

const socketTokenVerify = require('../middleware/socketTokenVerify');
// const socketBaseSecure = require('../middleware/socketBaseSecure');

module.exports = (socketServer, httpServer, socketClient, app) => {

  const userIO = socketServer.of(NAMESPACES.USER.NAME);
  const guestIO = socketServer.of(NAMESPACES.GUEST.NAME);

  //MIDDLEWARE
  // adminIO.use(adminAuthMiddleware);
  // socketServer.sockets.use(socketBaseSecure);
  userIO.use(socketTokenVerify);

  // HANDLING
  authSocket({ guestIO, socketIO:socketServer, httpServer, socketClient, app });
  userSocket({ userIO, socketIO:socketServer, httpServer, socketClient, app });
};
