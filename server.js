const http = require('http');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');
const { app, dependency  } = require('./app');

const httpServer = http.createServer(app);
const socketServer = socketIO(httpServer, { secure: true });

// передача зависимостей к обратботчику внутренних событии и обработчику socket.io
dependency({ socketServer, httpServer, socketClient, app });


module.exports.httpServer = httpServer;
module.exports.socketServer = socketServer;
module.exports.socketClient = socketClient;
module.exports.expressApp = app;
