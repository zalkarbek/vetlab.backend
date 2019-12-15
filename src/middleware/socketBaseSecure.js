
module.exports = (socket, next) => {
  const error = new Error('Forbidden');
  return next(error);
};
