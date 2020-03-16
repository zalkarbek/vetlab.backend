const fs = require('fs');
const middleware = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    middleware[file.replace(/(\.\/|\.js)/g, '')] = require(`./${file}`);
  });

module.exports = {
  getMiddleware(name) {
    return middleware[name];
  },
  ...middleware
};
