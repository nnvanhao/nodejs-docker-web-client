const ApiUtils = require('../common/api/api.router');
const { DockerController } = require('../controllers');

exports.routesConfig = function (app) {
    app.get(ApiUtils.DOCKER_INFO, [
        DockerController.getDockerInfo,
    ]);
    app.get(ApiUtils.DOCKER_VERSION, [
        DockerController.getDockerVersion,
    ]);
    app.get(ApiUtils.DOCKER_PING, [
        DockerController.pingDocker,
    ]);
    app.get(ApiUtils.DOCKER_CONTAINERS, [
        DockerController.getContainers,
    ]);
    app.get(ApiUtils.DOCKER_CONTAINER_LOGS, [
        DockerController.getContainerLogsById,
    ]);
    app.post(ApiUtils.DOCKER_CONTAINER_START, [
        DockerController.startContainer,
    ]);
    app.post(ApiUtils.DOCKER_CONTAINER_RESTART, [
        DockerController.restartContainer,
    ]);
    app.post(ApiUtils.DOCKER_CONTAINER_STOP, [
        DockerController.stopContainerById,
    ]);
    app.post(ApiUtils.DOCKER_CONTAINER_STOP_ALL, [
        DockerController.stopContainerAll,
    ]);
    app.delete(ApiUtils.DOCKER_CONTAINER_REMOVE, [
        DockerController.removeContainerById,
    ]);
};