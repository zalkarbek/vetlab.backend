const service = require('../service');
const userService = service.getService('user');

module.exports = (roles) => {
  return async (req, res, next) => {
    const userRoles = JSON.parse(req.userRoles);
    const checkedAccessRoles = await userService.checkAccessRole(userRoles, roles);
    if(checkedAccessRoles >= 1) {
      next();
    }
    else {
      let error = new Error('Access error');
      error.data = { type: 'user_access_denied', message: 'Access is denied' };
      return next(error);
    }
  };
};
