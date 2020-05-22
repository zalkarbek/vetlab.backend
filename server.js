const fs = require('fs');
const http = require('http');
const https = require('https');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');
const { app, db, dispatcher  } = require('./app');

const cert = {
  cert: fs.readFileSync('./cert/cert.pem', 'utf-8'),
  key: fs.readFileSync('./cert/key.pem', 'utf-8'),
  requestCert: true,
  rejectUnauthorized: false
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(cert, app);
const socketServer = socketIO(httpServer, {
  transports: ['polling', 'websocket']
});

// передача зависимостей к обратботчику внутренних событии и обработчику socket.io
dispatcher({ socketServer, httpServer, socketClient, app });

module.exports.httpServer = httpServer;
module.exports.httpsServer = httpsServer;
module.exports.socketServer = socketServer;
module.exports.socketClient = socketClient;
module.exports.app = app;
module.exports.db = db;
