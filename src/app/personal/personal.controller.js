
const { Controller } = require('../controller');
const personalService = require('../../service/personalService');

class PersonalController extends Controller {

  async create(req, res) {
    const newPersonal = req.personal;
  }

  async update(req, res) {

  }
}

module.exports = new PersonalController();
module.exports.PersonalController = PersonalController;
