const express = require('express');
const routes = express.Router();

const authRoutes = require('./auth/auth.routes');
const toolsRoutes = require('./tools/tools.routes');
const userRoutes = require('./users/user.routes');
const testRoutes = require('./test/test.routes');

routes.use('/api', authRoutes);
routes.use('/api', toolsRoutes);
routes.use('/api', userRoutes);
routes.use('/api', testRoutes);

module.exports = routes;
