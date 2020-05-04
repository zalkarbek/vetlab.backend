const i18n = require('../src/i18n');

function responseError(statusCode, status, message, stack ,res) {
  return res.status(statusCode).json({
    error: true,
    message,
    stack,
    statusCode,
    status
  });
}

function handleError({ err, res, stack }) {
  let { statusCode = 500, status, message } = err;
  let translatedMessage = i18n.t(`error.${statusCode}.message`);
  message = message || translatedMessage;
  return responseError(statusCode, status, message, stack, res);
}


module.exports.handleError = handleError;
