const express = require('express');
const router = express.Router();
const controller = require('./admin.controller');
const safeAsync = require('../middleware/async');
const adminAuth = require('../middleware/restAdminAuth');

router.get('/v1/admin/profile', adminAuth, safeAsync(controller.getAdminProfile));
module.exports = router;