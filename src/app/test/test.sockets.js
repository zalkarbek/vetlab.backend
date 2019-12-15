
module.exports = ({ socketServer, httpServer, socketClient, app }) => {

  socketServer.on('connection', (socket) => {
    console.log(`Клиент: ${socket.id} подключился`);
  });

};
