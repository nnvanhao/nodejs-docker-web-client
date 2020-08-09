const config = require('../src/config');
const https = require('https');
const Logger = require('../src/helpers/logger.helper');
const { normalizePort } = require('../src/helpers/server.helper');
const { LOGGER_TYPE } = require('../src/common/constants/common.constant');
const logger = new Logger();

exports.create = function (app) {
    // Create server
    let server = https.createServer(app);
    const port = normalizePort(config.PORT);

    server = app.listen(port, function () {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Server started. Listening at host: ' + host + ' - port: ' + port);
    });

    // Handle server error
    server.on('error', function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.log(`${bind} requires elevated privileges at: ${new Date()}`, LOGGER_TYPE.ERROR);
                break;

            case 'EADDRINUSE':
                logger.log(`${bind} is already in use at: ${new Date()}`, LOGGER_TYPE.ERROR);
                break;

            default:
                throw error;
        }
    });
};
