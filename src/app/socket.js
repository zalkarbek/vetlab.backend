const userSocket = require('./users/user.socket');
const authSocket = require('./auth/auth.socket');
const socketTokenVerify = require('../middleware/socketTokenVerify');

class SocketEmitter {
  init({ socketServer, SOCKS, ...injection}) {
    // Пространство имен авторизованных пользователей
    const authIO = socketServer.of(SOCKS.NAMESPACES.AUTHORIZED);
    // Пространство имен гостей
    const guestIO = socketServer.of(SOCKS.NAMESPACES.GUEST);

    // socketServer.sockets.use(socketBaseSecure);
    authIO.use(socketTokenVerify);

    // HANDLING
    authSocket({ socketIO:guestIO, ...injection });
    // userSocket({ socketIO:this.authIO, ...injection });
  }
}

const socketEmitter = new SocketEmitter();

module.exports = (injection) => {
  socketEmitter.init(injection);
};
