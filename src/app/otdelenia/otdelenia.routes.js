const controller = require('./otdelenia.controller');
const safeAsync = require('../../middleware/async');

module.exports = ({ routes }) => {
  routes.get('/v1/otdelenia/all', safeAsync( controller.all ));
  routes.get('/v1/otdelenia/all/:id', safeAsync( controller.id ));
  routes.post('/v1/otdelenia/create', safeAsync( controller.create ));
  routes.put('/v1/otdelenia/update', safeAsync( controller.update ));
  routes.delete('/v1/otdelenia/destroy', safeAsync( controller.destroy ));
  return routes;
};
