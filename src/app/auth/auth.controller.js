const Controller = require('../controller');
const authService = Controller.getService('auth');
const personalService = Controller.getService('personal');
const rest = Controller.getHelper('rest');
const restDataName = 'auth';

class AuthController extends Controller {
  constructor(params) {
    super(params);
  }
  // Авторизация пользователей
  async userAuthenticate(req, res) {
    const { email, password } = req.body;
    const user = await authService.userAuthenticate({ email, password });
    if (!user) {
      return res.json(rest.response({
        error: true,
        message: 'auth.fail'
      }));
    }
    const personal = await personalService.getPersonalByUser(user);
    if(!personal) {
      return res.json(rest.response({
        error: true,
        message: 'auth.personal.notConnected'
      }));
    }
    const personalData = {
      id: personal.id,
      otdelId: personal.otdelId,
      subOtdelId: personal.subOtdelId,
      sDoljnostId: personal.sDoljnostId,
    };
    const token = await authService.userGetToken(user, { personal: personalData });
    return res.json({
      error: false,
      message: 'Authorization success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        personal: personalData
      }
    });
  }
}

module.exports = new AuthController({ restDataName });
