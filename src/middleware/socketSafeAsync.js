const config = require('../config');
const asyncMiddleware = (
  fn,
  {
    socket,
    successEvent,
    errorEvent,
    successMessage,
    errorMessage,
    successCallback,
    errorCallback
  }) => (...params) => {
    const errorCb = (e) => {
      if(errorEvent)
        socket.emit(errorEvent, {
          error: true,
          message: errorMessage || e.message,
          stack: config.isDev ? e : {}
        });
      if(config.isDev) {
        console.error(e);
      }
    };
    const successCb = (data) => {
      if(successEvent)
        socket.emit(successEvent, {
          error: false,
          message: successMessage|| '',
          data
        });
    };
    return Promise.resolve(fn(...params))
      .then(successCallback || successCb)
      .catch(errorCallback || errorCb);
  };

module.exports = asyncMiddleware;
