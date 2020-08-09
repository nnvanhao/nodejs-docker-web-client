const { CommonRoutes, AuthorizationRoutes } = require('../src/routes');

exports.initRoutes = function (app) {
    CommonRoutes.routesConfig(app);
    AuthorizationRoutes.routesConfig(app);
};