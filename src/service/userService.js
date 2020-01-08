const { Service } = require('./service');

class UserService extends Service {

}

module.exports = new UserService();
module.exports.UserService = UserService;
