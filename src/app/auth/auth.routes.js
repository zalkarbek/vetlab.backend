const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const safeAsync = require('../../middleware/async');

router.post('/v1/auth/user/login', safeAsync(controller.userAuthenticate));

module.exports = router;
