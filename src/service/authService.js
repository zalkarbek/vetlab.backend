
const { Service } = require('./service');
const crypter = require('../helpers/crypter');

class AuthService extends Service {

  async userExists({ email, name }) {
    return this.db.user.findOne({
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
    const user = await this.db.user.findOne({
      where: {
        email
      },
      include: [
        {
          model: this.db.roles,
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
module.exports.AuthService = AuthService;
