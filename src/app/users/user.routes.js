const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const safeAsync = require('../../middleware/async');
const jwtVerify = require('../../middleware/restTokenVerify');

router.get('/v1/user/profile', jwtVerify ,safeAsync(controller.getUserProfile));

module.exports = router;
