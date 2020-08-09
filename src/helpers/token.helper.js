const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

exports.getToken = (req) => {
    let salt = crypto.randomBytes(16).toString('base64');
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION_IN_SECONDS });
    return token;
};

exports.getRefreshToken = (req) => {
    let refreshId = req.body.userId + config.JWT_SECRET;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    let refreshToken = new Buffer(hash).toString('base64');
    return refreshToken;
};