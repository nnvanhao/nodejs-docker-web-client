const HttpStatus = require('http-status-codes');
const BaseController = require('./base.controller');
const { DockerService } = require('../services');

class DockerController extends BaseController {
    constructor() {
        super();
        this.dockerService = new DockerService();
    }

    getDockerInfo = async (req, res) => {
        const dockerInfo = await this.dockerService.getDockerInfo();
        this.sendResponse(dockerInfo, this, HttpStatus.OK, req, res);
    }

    getDockerVersion = async (req, res) => {
        const dockerVersion = await this.dockerService.getDockerVersion();
        this.sendResponse(dockerVersion, this, HttpStatus.OK, req, res);
    }

    pingDocker = async (req, res) => {
        const pingDocker = await this.dockerService.pingDocker();
        this.sendResponse(pingDocker, this, HttpStatus.OK, req, res);
    }

    getContainers = async (req, res) => {
        const containers = await this.dockerService.getContainers();
        this.sendResponse(containers, this, HttpStatus.OK, req, res);
    }

    getContainerLogsById = async (req, res) => {
        const { containerId = '' } = req.body;
        const logsResult = await this.dockerService.getContainerLogsById(containerId);
        this.sendResponse(logsResult, this, HttpStatus.OK, req, res);
    }

    startContainer = async (req, res, next) => {
        const { containerId = '' } = req.body;
        const logsResult = await this.dockerService.startContainer(req, res, next, containerId);
        this.sendResponse(logsResult, this, HttpStatus.OK, req, res);
    }

    restartContainer = async (req, res) => {
        const { containerId = '' } = req.body;
        const restartContainerResult = await this.dockerService.restartContainer(containerId);
        this.sendResponse(restartContainerResult, this, HttpStatus.OK, req, res);
    }

    stopContainerById = async (req, res) => {
        const { containerId = '' } = req.body;
        const stopContainerResult = await this.dockerService.stopContainer(containerId);
        this.sendResponse(stopContainerResult, this, HttpStatus.OK, req, res);
    }

    stopContainerAll = async (req, res) => {
        const stopContainerAllResult = await this.dockerService.stopContainerAll();
        this.sendResponse(stopContainerAllResult, this, HttpStatus.OK, req, res);
    }

    stopContainerAll = async (req, res) => {
        const stopContainerAllResult = await this.dockerService.stopContainerAll();
        this.sendResponse(stopContainerAllResult, this, HttpStatus.OK, req, res);
    }

    removeContainerById = async (req, res, next) => {
        const { containerId = '', isForce = false } = req.body;
        const removeContainerAllResult = await this.dockerService.removeContainer(req, res, next, containerId, isForce);
        this.sendResponse(removeContainerAllResult, this, HttpStatus.OK, req, res);
    }
}

module.exports = new DockerController();