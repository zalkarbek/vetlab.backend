
const authService = require('../../service/authService');

class AuthController {

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
    const token = authService.userGetToken(user);
    return res.json({
      error: false,
      message: 'Authorization success',
      token,
      user: {
        name: user.name,
        login: user.login,
        email: user.email,
      }
    });
  }
}

module.exports = new AuthController();
module.exports.AuthController = AuthController;
