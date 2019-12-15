
const cityHandler = require('./admin.sockets.city');

module.exports = ({ adminIO, socketIO, httpServer, socketClient, app }) => {
  adminIO.on('connect', (socket) => {

    if(socket.payload && socket.payload.adminId && socket.payload.login) {
      // eslint-disable-next-line no-unused-vars
      const { tokenId, ...payload } = socket.payload;
      socket.emit('admin_connected', payload);
    }

    socket.on('on_get_cities', cityHandler.onGet({ socket }));
  });
};
