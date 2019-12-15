const express = require('express');
const router = express.Router();
const controller = require('./test.controller');
const asyncMiddleware = require('../../middleware/async');

router.get('/v1/test/ok', asyncMiddleware(controller.get));

module.exports = router;
