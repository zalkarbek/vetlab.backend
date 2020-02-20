
const { Controller } = require('../controller');
const authService = require('../../service/authService');

class AuthController extends Controller {
  constructor() {
    super();
  }

  // Авторизация пользователей
  async userAuthenticate(req, res) {
    const EVENTS = Controller.getInject('EVENTS');
    const eventEmitter = Controller.getInject('eventEmitter');
    const socketServer = Controller.getInject('socketServer');
    console.log(socketServer);

    const { email, password } = req.body;
    eventEmitter.emit('test', { email, password });

    const user = await authService.userAuthenticate({ email, password });
    if (!user) {
      return res.json({
        error: true,
        message: 'Authorization failed login or password wrong'
      });
    }
    const token = await authService.userGetToken(user);
    return res.json({
      error: false,
      message: 'Authorization success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        personal: {}
      }
    });
  }
}

module.exports = new AuthController();
module.exports.AuthController = AuthController;
