const express = require('express');
const router = express.Router();
const controller = require('./tools.controller');
const safeAsync = require('../../middleware/async');
const jwtVerify = require('../../middleware/restTokenVerify');

router.get('/v1/tools/socketEvents', jwtVerify ,safeAsync(controller.getSocketEvents));

module.exports = router;
