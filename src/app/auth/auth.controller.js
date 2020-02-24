const Controller = require('../controller');
const authService = Controller.getService('auth');

class AuthController extends Controller {
  // Авторизация пользователей
  async userAuthenticate(req, res) {
    const { email, password } = req.body;
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
