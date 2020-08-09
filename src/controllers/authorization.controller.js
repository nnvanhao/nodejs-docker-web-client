const TokenHelper = require("../helpers/token.helper");
const HttpStatus = require("http-status-codes");
const BaseController = require("./base.controller");

class AuthorizationController extends BaseController {
    constructor() {
        super();
    };

    signIn = (req, res, next) => {
        const token = TokenHelper.getToken(req);
        const refreshToken = TokenHelper.getRefreshToken(req);

        const authData = {
            accessToken: token,
            refreshToken: refreshToken,
        };

        this.sendResponse(authData, this, HttpStatus.OK, req, res, next);
    };

    signUp = (req, res, next) => {
        const token = TokenHelper.getToken(req);
        const refreshToken = TokenHelper.getRefreshToken(req);

        const authData = {
            accessToken: token,
            refreshToken: refreshToken,
        };

        this.sendResponse(authData, this, HttpStatus.CREATED, req, res, next);
    };

    signOut = (req, res, next) => {
        this.sendResponse(null, this, HttpStatus.NO_CONTENT, req, res, next);
    };
}

module.exports = new AuthorizationController();