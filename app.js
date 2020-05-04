const env = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const pathResolve = require('./pathResolve');

const routes = require('./src/app/routes');
const dispatcher = require('./src/dispatcher');
const db = require('./src/db/models');

const app = express();
const port = Number(process.env.SERVER_HTTPS_PORT) || 3000;
env.config();

// Обьявление констант путей
app.set('pathResolve', pathResolve);
app.use((req, res, next) => {
  req.pathResolve = pathResolve;
  next();
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(process.env.NODE_ENV === 'development' ? logger('dev') : logger('combined'));
app.use(routes({ app, pathResolve, routes: express.Router() }));

const { handleError } = require('./helper/error');

function showErrorInConsole(err, req, res, next) {
  console.error(err.stack);
  next(err);
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

app.use(showErrorInConsole);
app.use((err, req, res, next) => {
  const stack = process.env.NODE_ENV === 'development' ? err.stack : {};
  handleError({ err, res, stack });
});
app.on('error', onError);

module.exports.app = app;
module.exports.db = db;
module.exports.dispatcher = dispatcher;
