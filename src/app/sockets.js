const userSocket = require('./user/user.socket');
const vnytSocket = require('./vnytNapravlenie/vnyt.socket');
const naSocket = require('./napravlenie/na.socket');
const isSocket = require('./isledovanie/is.socket');
const Handler = require('./Handler');

class Sockets {
  async binding({ socketServer }) {
    const SOCKS = Handler.getInject('SOCKS');
    // Пространство авторизованных пользователей
    const authIO = socketServer.of(`/${SOCKS.NAMESPACES.AUTHORIZED}`);

    // Пространство гостей
    // const guestIO = socketServer.of(`/${SOCKS.NAMESPACES.GUEST}`);

    // привязка к контейнеру сокетов
    Handler.bindingInjects({ authSocket: authIO });

    const socketTokenVerifyMiddleware = Handler.getMiddleware('socketTokenVerify');

    authIO.use(socketTokenVerifyMiddleware);

    // HANDLING
    // authSocket.binding({ socketIO:guestIO });
    userSocket.binding({ socketIO: authIO });
    vnytSocket.binding({ socketIO: authIO });
    naSocket.binding({ socketIO: authIO });
    isSocket.binding({ socketIO: authIO });
  }
}

module.exports = new Sockets();

