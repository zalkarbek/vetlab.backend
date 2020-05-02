const Controller = require('../controller');
const restDataName = 'napravlenie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  create(req, res) {

    // const zapolnilPersonalId;
    // const zapolnilDepartmentId;
    // const zapolnilDate;
    //
    // const prinyalPersonalId;
    // const prinyalOtdelId;
    // const prinyalDate;

    console.log(req.payload);
    return res.json({
      message: 'hello',
      user: req.payload,
      userRoles: JSON.parse(req.userRoles)
    });
  }
}

module.exports = new BaseController({ restDataName });
