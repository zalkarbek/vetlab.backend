const userService = require('../service/userService');

module.exports = (roles) => {
  return async (socket, next) => {
    const userRoles = JSON.parse(socket.userRoles);
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
