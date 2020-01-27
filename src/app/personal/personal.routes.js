const express = require('express');
const router = express.Router();
const controller = require('./personal.controller');
const safeAsync = require('../../middleware/async');
const restTokenVerify = require('../../middleware/restTokenVerify');
const restRoleVerify = require('../../middleware/restRoleVerify');

router.post('/v1/personal/create', restTokenVerify, restRoleVerify(['admin']), safeAsync(controller.create));

module.exports = router;
