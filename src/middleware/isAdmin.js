const service = require('../service');
const userService = service.getService('user');

module.exports = async (req, res, next) => {
  if(req.payload && req.userRoles) {
    const userId = req.payload.userId;
    const userRoles = JSON.parse(req.userRoles);
    req.isAdmin = await userService.isAdmin(userId, userRoles);
    return next();
  }
};
