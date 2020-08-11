const HttpStatus = require('http-status-codes');
const BaseController = require('./base.controller');
const { DockerService } = require('../services');

class DockerController extends BaseController {
    constructor() {
        super();
        this.dockerService = new DockerService();
    }

    getContainers = async (req, res, next) => {
        const containers = await this.dockerService.getContainers();
        this.sendResponse(containers, this, HttpStatus.OK, req, res);
    }

    getContainerLogsById = async (req, res, next) => {
        const { containerId = '' } = req.body;
        const logsResult = await this.dockerService.getContainerLogsById(containerId);
        this.sendResponse(logsResult, this, HttpStatus.OK, req, res);
    }
}

module.exports = new DockerController();