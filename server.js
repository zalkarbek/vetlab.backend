
const fs = require('fs');
const https = require('https');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');
const { app } = require('./app');
const socketEvents = require('./src/app/socket');

const cert = {
  cert: fs.readFileSync('./cert/server.cert', 'utf-8'),
  key: fs.readFileSync('./cert/server.key', 'utf-8'),
  requestCert: false,
  rejectUnauthorized: false,
};
const httpsServer = https.createServer(cert, app);
const socketServer = socketIO(httpsServer, { secure: true });

socketEvents(socketServer, httpsServer, socketClient, app);

module.exports.httpsServer = httpsServer;
module.exports.socketServer = socketServer;
module.exports.socketClient = socketClient;
module.exports.expressApp = app;
