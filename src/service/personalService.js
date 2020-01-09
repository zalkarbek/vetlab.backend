
const { Service } = require('./service');

class PersonalService extends Service {

  async getFromUserPersonalProfile(user) {
    return this.db.personal.findOne({
      where : {
        userId: user.id
      }
    });
  }
}

module.exports = new PersonalService();
module.exports.PersonalService = PersonalService;
