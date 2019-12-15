
const db = require('../../db/models/index');

module.exports = {

  onGet({ socket }, clientEvent) {
    return async () => {
      const user = await db.User.findOne({
        where: {
          email: socket.payload.email
        }
      });
      socket.emit(clientEvent, { user });
    };
  },

};
