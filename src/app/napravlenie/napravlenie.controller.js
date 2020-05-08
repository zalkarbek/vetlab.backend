const Controller = require('../controller');
const rest = Controller.getHelper('rest');
const otdelService = Controller.getService('otdel');
const personalService = Controller.getService('personal');
const directionService = Controller.getService('napravlenie');
const restDataName = 'napravlenie';
const restData = Controller.getRestDataByName(restDataName);

class BaseController extends Controller {
  constructor(params) {
    super(params);
  }

  async create(req, res) {
    const { pos_material, ...napravlenie } = req.body;
    const payload = req.payload;
    const personal = await personalService.getPersonalById(payload.personal.id);
    const department = await otdelService.getDepartmentByOtdelId(personal.otdelId);

    const zapolnilPersonalId = personal.id;
    console.log(personal.otdelId);
    const zapolnilDepartmentId = department.id;
    const zapolnilDate = new Date();
    // const prinyalPersonalId;
    // const prinyalOtdelId;
    // const prinyalDate;

    // oldPrinyalPersonalId
    // oldPrinyalOtdelId
    // oldPrinyalDate
    const updatedDirection = {
      ...napravlenie,
      zapolnilPersonalId,
      zapolnilDepartmentId,
      zapolnilDate,
    };
    const createdDirection = await directionService.createNapravlenieWithPosMaterial(
      updatedDirection,
      pos_material
    );
    if(!createdDirection) {
      throw new Error('napravlenie not saved');
    }
    return res.json(rest.responseWith({
      unit: restData.i18nUnitOne,
      message: 'create.success.one',
      data: createdDirection
    }));
  }
}

module.exports = new BaseController({ restDataName });
