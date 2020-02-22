const userSocket = require('./users/user.socket');
const authSocket = require('./auth/auth.socket');
const socketTokenVerify = require('../middleware/socketTokenVerify');

class SocketEmitter {
  binding({ socketServer, SOCKS, ...injection }) {
    // Пространство имен авторизованных пользователей
    const authIO = socketServer.of(SOCKS.NAMESPACES.AUTHORIZED);
    // Пространство имен гостей
    const guestIO = socketServer.of(SOCKS.NAMESPACES.GUEST);

    // socketServer.sockets.use(socketBaseSecure);
    authIO.use(socketTokenVerify);

    // HANDLING
    authSocket({ socketIO:guestIO, socketServer, SOCKS, ...injection });
    // userSocket({ socketIO: authIO, socketServer, SOCKS, ...injection });
  }
}

module.exports = new SocketEmitter();

