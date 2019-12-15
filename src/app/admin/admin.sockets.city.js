
const cityModel = require('../../db/models/city');

module.exports = {

  onGet({ socket }) {
    return async () => {
      const cities = await cityModel.find().exec();
      socket.emit('on_admin_get_cities', { data: cities });
    };
  },

};