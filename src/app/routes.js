const express = require('express');
const routes = express.Router();

const authRoutes = require('./auth/auth.routes');
const testRoutes = require('./test/test.routes');
const userRoutes = require('./users/user.routes');

routes.use('/api', userRoutes);
routes.use('/api', testRoutes);
routes.use('/api', authRoutes);

module.exports = routes;
