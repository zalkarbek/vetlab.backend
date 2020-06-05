const bindMethodToRoute = require('./bindingMethodToRoute');
const authRoutes = require('./auth/auth.routes');
const optionRoutes = require('./option/opt.routes');
const userRoutes = require('./user/user.routes');
const rolesRoutes = require('./roles/roles.routes');
const boleznRoutes = require('./bolezn/bolezn.routes');
const doljnostRoutes = require('./doljnost/doljnost.routes');
const materialRoutes = require('./material/material.routes');
const materialAnimalTypeRoutes = require('./materialAnimalType/materialAnimalType.routes');
const materialTypeRoutes = require('./materialType/materialType.routes');
const meraRoutes = require('./mera/mera.routes');
const metodRoutes = require('./metod/metod.routes');
const otdeleniaRoutes = require('./otdelenia/otdelenia.routes');
const pokazatelRoutes = require('./pokazatel/pokazatel.routes');
const regionTypeRoutes = require('./regionType/regionType.routes');
const regionRoutes = require('./region/region.routes');
const napravlenieRoutes = require('./napravlenie/napravlenie.routes');
const vnytNapravlenieRoutes = require('./vnytNapravlenie/vnyt.routes');
const departmentRoutes = require('./department/department.routes');
const otdelRoutes = require('./otdel/otdel.routes');
const subOtdelRoutes = require('./subOtdel/subOtdel.routes');
const planRabotyRoutes = require('./plan/plan.routes');
const personalRoutes = require('./personal/personal.routes');
const posMaterialRoutes = require('./posMaterial/posMaterial.routes');
const preparatRoutes = require('./preparat/preparat.routes');
const isledovanieRoutes = require('./isledovanie/isledovanie.routes');
const isledovanieResultNamesRoutes = require('./isledovanieResultNames/isledovanieResult.routes');

module.exports = ({ routes }) => {
  return bindMethodToRoute(
    [
      optionRoutes,
      authRoutes,
      userRoutes,
      rolesRoutes,
      boleznRoutes,
      doljnostRoutes,
      materialAnimalTypeRoutes,
      materialTypeRoutes,
      materialRoutes,
      meraRoutes,
      metodRoutes,
      otdeleniaRoutes,
      pokazatelRoutes,
      regionTypeRoutes,
      regionRoutes,
      napravlenieRoutes,
      vnytNapravlenieRoutes,
      departmentRoutes,
      otdelRoutes,
      subOtdelRoutes,
      planRabotyRoutes,
      personalRoutes,
      posMaterialRoutes,
      preparatRoutes,
      isledovanieRoutes,
      isledovanieResultNamesRoutes
    ],
    routes
  );
};
