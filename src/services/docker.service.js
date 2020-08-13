const Docker = require('dockerode');
const { buildErrorItem, sendErrorResponse } = require('../helpers/error.helper');
const HttpStatus = require('http-status-codes');
const Message = require('../common/constants/message.constant');

class DockerService {
    constructor() {
        this.docker = new Docker();
    }

    getDockerInfo = async () => {
        const dockerInfo = await this.docker.info();
        return dockerInfo;
    }

    getDockerVersion = async () => {
        const dockerVersion = await this.docker.version();
        return dockerVersion;
    }

    pingDocker = async () => {
        const pingDocker = await this.docker.ping();
        return pingDocker;
    }

    getContainers = async () => {
        const containers = await this.docker.listContainers();
        return containers;
    }

    getContainerLogsById = async (containerId) => {
        const container = await this.docker.getContainer(containerId);

        const logsResultStream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: true,
        })


        await logsResultStream.on('data', async logsInfo => {
            let logsResult = [];

            let logsArray = await logsInfo.toString().split("\n");

            for (let index = 0; index < logsArray.length; index++) {
                await logsResult.push({
                    dateTime: logsArray[index].substring(8, 38),
                    logsData: logsArray[index].substring(39, logsArray[index].length),
                });
            }

            await logsResult.pop();

            return logsResult;
        })
    }

    startContainer = async (req, res, next, containerId) => {
        try {
            const container = await this.docker.getContainer(containerId);
            return await container.start(containerId);
        } catch (error) {
            const errorItem = buildErrorItem('startContainer', 'containerId', HttpStatus.BAD_REQUEST, Message.START_CONTAINER_REMOVED, error.json.message);
            sendErrorResponse(errorItem, req, res, next, null);
        }
    }

    restartContainer = async (containerId) => {
        const container = await this.docker.getContainer(containerId);
        const result = await container.restart(containerId);
        return result;
    }

    stopContainer = async (containerId) => {
        const container = await this.docker.getContainer(containerId);
        const result = await container.stop(containerId);
        return result;
    }

    stopContainerAll = async () => {
        const containers = await this.docker.listContainers();
        containers.map(async item => {
            const container = await this.docker.getContainer(item.Id);
            const result = await container.stop();

        })
        return true;
    }

    removeContainer = async (req, res, next, containerId, force) => {
        try {
            const container = await this.docker.getContainer(containerId);
            return await container.remove({ containerId, force });
        } catch (error) {
            const errorItem = buildErrorItem('removeContainer', 'containerId', HttpStatus.BAD_REQUEST, Message.CAN_NOT_REMOVE_CONTAINER_IS_RUNNING, error.json.message);
            sendErrorResponse(errorItem, req, res, next, null);
        }
    }

    getDockerEvents = async () => {
        const docker = new Docker();
        const dockerEventsStream = await docker.getEvents();

        dockerEventsStream.on('data', async logsInfo => {
            const dockerEvent = await JSON.parse(logsInfo.toString());

            if (dockerEvent.Type === 'container' && dockerEvent.status === 'start') {
                console.log('123');
            } else if (dockerEvent.Type === 'container' && dockerEvent.status === 'stop') {
                console.log('456');
            } else if (dockerEvent.Type === 'container' && dockerEvent.status === 'restart') {
                console.log('789');
            } else if (dockerEvent.Type === 'container' && dockerEvent.status === 'destroy') {
                console.log('789');
            }
        })
    }
}

module.exports = DockerService;