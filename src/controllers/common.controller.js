const HttpStatus = require('http-status-codes');
const BaseController = require('./base.controller');

class AuthorizationController extends BaseController {
    constructor() {
        super();
    }

    accessRoot = (req, res, next) => {
        const data = {
            mess: "Welcome NodeJS Express Structure",
        }
        this.sendResponse(data, this, HttpStatus.OK, req, res);
    }
}

module.exports = new AuthorizationController();