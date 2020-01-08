
// const fs = require('fs');
// const https = require('https');
const http = require('http');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');
const { app } = require('./app');
const socketEvents = require('./src/app/socket');

// const cert = {
//   cert: fs.readFileSync('./cert/server.cert', 'utf-8'),
//   key: fs.readFileSync('./cert/server.key', 'utf-8'),
//   requestCert: false,
//   rejectUnauthorized: false,
// };
// const httpsServer = https.createServer(cert, app);

const httpServer = http.createServer(app);
const socketServer = socketIO(httpServer, { secure: true });

socketEvents(socketServer, httpServer, socketClient, app);

module.exports.httpServer = httpServer;
module.exports.socketServer = socketServer;
module.exports.socketClient = socketClient;
module.exports.expressApp = app;
