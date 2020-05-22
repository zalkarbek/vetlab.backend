const fs = require('fs');
const data = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0)
      && (file !== 'index.js')
      && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    data[file.replace(/(\.\/|\.js)/g, '')] = require(`./${file}`);
  });

module.exports = {
  ...data
};
