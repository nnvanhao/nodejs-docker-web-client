const { CommonRoutes, AuthorizationRoutes, DockerRoutes } = require('../src/routes');

exports.initRoutes = function (app) {
    CommonRoutes.routesConfig(app);
    AuthorizationRoutes.routesConfig(app);
    DockerRoutes.routesConfig(app);
};