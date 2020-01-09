const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');

router.post('/v1/user/profile', restTokenVerify, restRoleVerify(['user']), safeAsync(controller.getUserProfile));

module.exports = router;
