
const appRootPath = require('app-root-path');
const env = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const pathResolve = require('./pathResolve');
const routes = require('./src/app/routes');
const app = express();
const port = Number(process.env.SERVER_HTTPS_PORT) || 3000;
env.config();

// Обьявление констант путей
const root = pathResolve(appRootPath);
app.set('rootPath', root);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(process.env.NODE_ENV === 'development' ? logger('dev') : logger('combined'));

app.use(routes({ app, root, routes: express.Router() }));

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err.message,
    data: err.data,
    err: process.env.NODE_ENV === 'development' ? err : {},
  });
}

function error404(err, req, res, next) {
  res.status(404).json({
    error: true,
    message: 'Not Found',
    data: err.data,
    err: process.env.NODE_ENV === 'development' ? err : {},
  });
}

function errorHandler(err, req, res, next) {
  res.json({ error: true, message: 'Unknown error' });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(error404);
app.use(errorHandler);

app.on('error', onError);

module.exports.app = app;
