const ApiUtils = require('../common/api/api.router');
const { DockerController } = require('../controllers');

exports.routesConfig = function (app) {
    app.get(ApiUtils.DOCKER_CONTAINERS, [
        DockerController.getContainers,
    ]);
    app.get(ApiUtils.DOCKER_CONTAINER_LOGS, [
        DockerController.getContainerLogsById,
    ]);
};