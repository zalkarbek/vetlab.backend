const userSocket = require('./user/user.socket');
const authSocket = require('./auth/auth.socket');
const socketTokenVerify = require('../middleware/socketTokenVerify');
const Container = require('../container');
const SOCKS = Container.getInject('SOCKS');

class SocketEmitter {
  binding({ socketServer, ...injection }) {
    // Пространство имен авторизованных пользователей
    const authIO = socketServer.of(SOCKS.NAMESPACES.AUTHORIZED);
    // Пространство имен гостей
    const guestIO = socketServer.of(SOCKS.NAMESPACES.GUEST);

    // socketServer.sockets.use(socketBaseSecure);
    authIO.use(socketTokenVerify);

    // HANDLING
    authSocket({ socketIO:guestIO, socketServer, ...injection });
    userSocket({ socketIO: authIO, socketServer, ...injection });
  }
}

module.exports = new SocketEmitter();

