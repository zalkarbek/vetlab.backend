const Controller = require('../controller');
const reportService = Controller.getService('report');
const refService = Controller.getService('ref');
const restDataName = 'report_otdel';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async getOtdelData(req, res) {
    const { otdelId = null } = refService.getObjectOneOfTwo(req.query, req.body);
    const result = await reportService.getOtdelData(otdelId);
    return res.json(result);
  }
}

const controller = new BaseController({ restDataName });
const restData = controller.getRestData();

module.exports = { controller, restData };

