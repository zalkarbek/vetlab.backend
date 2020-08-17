const Service = require('./service');
const db = Service.getInject('db');
const isService = require('./isledovanie');

class ReportService extends Service {
  // ========================= REFERENCE ================================//
  constructor(params) {
    super(params);
  }

  async getOtdelData(otdelId = null) {
    const query = db.QUERY.GET_OTDEL_DATA_ID(otdelId);
    return db.vetdb.query(query.Q,  { replacements: query.REPLACE, type: db.vetdb.QueryTypes.SELECT });
  }

  async getIsledovanieData(isledovanieId = null) {
    return isService.getByIdReport(isledovanieId);
  }

}

module.exports = new ReportService({ });
