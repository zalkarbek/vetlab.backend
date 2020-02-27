
const Service = require('./service');
const crypter = require('../helpers/crypter');
const db = Service.getInject('db');

class AuthService extends Service {

  constructor() {
    super();
  }

  async userExists({ email, name }) {
    return db.user.findOne({
      where: {
        [this.Op.or]: [
          {
            email: email
          },
          {
            name: name
          }
        ]
      }
    });
  }

  async userAuthenticate({ email, password }) {
    const user = await db.user.findOne({
      where: {
        email
      },
      include: [
        {
          model: db.roles,
          attributes: ['role_i18n', 'role_name', 'role_key', 'active', 'priority'],
          where: { active: 1 }
        }
      ]
    });
    if(!user) return  null;
    if(await crypter.validPwd(password, user.password)) return user;
    return null;
  }

  async userGetToken(user) {
    if(!user) return null;
    user.tokenId = this.tokenGenerator.uid();
    await user.save();
    return this.tokenGenerator.jwtSign({
      userId: user.id,
      name: user.name,
      login: user.login,
      email: user.email,
      tokenId: user.tokenId
    });
  }
}

module.exports = new AuthService();