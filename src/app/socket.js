const userSocket = require('./user/user.socket');
const authSocket = require('./auth/auth.socket');
const vnytNapravlenieSocket = require('./vnytNapravlenie/vnyt.socket');
const socketTokenVerifyMiddleware = require('../middleware/socketTokenVerify');
const Container = require('../container');
const SOCKS = Container.getInject('SOCKS');

class SocketEmitter {
  binding({ socketServer, ...injection }) {
    // Пространство имен авторизованных пользователей
    const authIO = socketServer.of(`/${SOCKS.NAMESPACES.AUTHORIZED}`);
    // Пространство имен гостей
    const guestIO = socketServer.of(`/${SOCKS.NAMESPACES.GUEST}`);
    Container.binding({ authSocket: authIO, guestSocket: guestIO });

    // socketServer.sockets.use(socketBaseSecure);
    authIO.use(socketTokenVerifyMiddleware);

    // HANDLING
    authSocket({ socketIO:guestIO, socketServer, Container, ...injection });
    userSocket.binding({ socketIO: authIO, socketServer, Container, ...injection });
    vnytNapravlenieSocket.binding({ socketIO: authIO, socketServer, Container, ...injection });
  }
}

module.exports = new SocketEmitter();

