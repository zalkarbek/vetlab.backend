
const userSocket = require('./users/user.socket');
const authSocket = require('./auth/auth.socket');

const socketTokenVerify = require('../middleware/socketTokenVerify');
const socketBaseSecure = require('../middleware/socketBaseSecure');

module.exports = (socketServer, httpsServer, socketClient, app) => {

  const userIO = socketServer.of('/users');
  const guestIO = socketServer.of('/guest');

  //MIDDLEWARE
  // adminIO.use(adminAuthMiddleware);
  socketServer.sockets.use(socketBaseSecure);
  userIO.use(socketTokenVerify);

  // HANDLING
  authSocket({ guestIO, socketIO:socketServer, httpsServer, socketClient, app });
  userSocket({ userIO, socketIO:socketServer, httpsServer, socketClient, app });
};
