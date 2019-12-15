const tokenGenerator = require('../../helpers/token-generator');
const crypter = require('../../helpers/crypter');
const db = require('../../db/models/index');

module.exports = {

  onAuthenticate({ socket }, clientEvent) {
    return async (data) => {
      const email = data.email || '';
      const password = data.password || '';

      const user = await db.User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        socket.emit(clientEvent, {
          user: null,
          error: true,
          message: 'Authorization failed login or password wrong'
        });
        return ;
      }

      if(await crypter.validPwd(password, user.password)) {
        user.tokenId = tokenGenerator.uid();
        const token = tokenGenerator.jwtSign({
          userId: user.id,
          name: user.name,
          login: user.login,
          email: user.email,
          tokenId: user.tokenId
        });
        await user.save();
        socket.emit(clientEvent, {
          error: false,
          message: 'Authorization success',
          token,
          user: {
            userId: user.id,
            name: user.name,
            login: user.login,
            email: user.email,
          }
        });
        return;
      }

      socket.emit(clientEvent, {
        user,
        error: false,
        message: 'Authorization failed login or password wrong'
      });
    };
  },

};
