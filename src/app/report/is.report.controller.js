const Controller = require('../controller');
const reportService = Controller.getService('report');
const refService = Controller.getService('ref');
const restDataName = 'report_isledovanie';

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async getIsledovanieData(req, res) {
    const { isledovanieId = null } = refService.getObjectOneOfTwo(req.query, req.body);
    const result = await reportService.getIsledovanieData(isledovanieId);
    return res.json(result);
  }
}

const controller = new BaseController({ restDataName });
const restData = controller.getRestData();

module.exports = { controller, restData };

