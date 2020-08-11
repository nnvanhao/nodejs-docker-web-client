const Docker = require('dockerode');

class DockerService {
    constructor() {
        this.docker = new Docker();
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

        let logsResult = [];

        logsResultStream.on('data', async logsInfo => {

            let logsArray = await logsInfo.toString().split("\n");

            for (let index = 0; index < logsArray.length; index++) {
                logsResult.push({
                    dateTime: logsArray[index].substring(8, 38),
                    logsData: logsArray[index].substring(39, logsArray[index].length),
                });
            }

            logsResult.pop();
            
            return logsResult;
        })
        return logsResult;
    }

    getDockerEvents = async () => {
        const docker = new Docker();
        const dockerEventsStream = await docker.getEvents();

        dockerEventsStream.on('data', async logsInfo => {
            const dockerEvent = await JSON.parse(logsInfo.toString());
            console.log(dockerEvent);
        })
    }
}

module.exports = DockerService;