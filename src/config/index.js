const env = process.env.NODE_ENV || 'dev';
const config = Object.assign({ env: env }, require('./env/dev.config'), require(`./env/${env}.config`));

module.exports = config;