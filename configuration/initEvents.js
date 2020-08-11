const { DockerService } = require('../src/services');

exports.initEvents = function () {
    const dockerService = new DockerService();
    dockerService.getDockerEvents();
};