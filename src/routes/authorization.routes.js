const VerifyUserMiddleware = require('../middlewares/authorization/verify.user.middleware');
const { AuthorizationController } = require('../controllers');
const ApiUtils = require('../common/api/api.router');
const Validator = require('../helpers/validator');

exports.routesConfig = function (app) {
    /**
      * @swagger
      * /auth:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: body
      *       in: body
      *       description: Sign in using email and password
      *       required: true
      *       schema:
      *         type: object
      *         required:
      *           - email
      *           - password
      *         properties:
      *           email:
      *             type: string
      *           password:
      *             type: string
      *     responses:
      *       200:
      *         description: Sign in successful
      */
    app.post(ApiUtils.AUTH, [
        Validator.validateAuthRules(),
        Validator.validateResult,
        AuthorizationController.signIn,
    ]);

    /**
      * @swagger
      * /signup:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: body
      *       in: body
      *       description: Sign up using email, firstName, lastName, password
      *       required: true
      *       schema:
      *         type: object
      *         required:
      *           - email
      *           - firstName
      *           - lastName
      *           - password
      *         properties:
      *           email:
      *             type: string
      *           firstName:
      *             type: string
      *           lastName:
      *             type: string
      *           password:
      *             type: string
      *     responses:
      *       201:
      *         description: Sign up successful
      */
    app.post(ApiUtils.SIGN_UP, [
        Validator.validateAuthRules(),
        Validator.validateResult,
        AuthorizationController.signUp,
    ]);

    /**
     * @swagger
     * /auth/refresh:
     *   post:
     *     tags:
     *       - Auth
     *     produces:
     *       - application/json
     *     parameters:
     *     - name: body
     *       in: body
     *       description: Get new token using refresh token
     *       required: true
     *       schema:
     *         type: object
     *         required:
     *           - refreshToken
     *         properties:
     *           refreshToken:
     *             type: string
     *     responses:
     *       200:
     *         description: Refresh token successful
     */
    app.post(ApiUtils.AUTH_REFRESH, [
        Validator.validateRefreshAuthRules(),
        Validator.validateResult,
        VerifyUserMiddleware.validJWTNeeded,
        // VerifyUserMiddleware.validRefreshNeeded,
        AuthorizationController.signIn,
    ]);

    /**
      * @swagger
      * /signout:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: fcmToken
      *       in: header
      *       description: fire base cloud messaging token
      *       required: true
      *       type: string
      *     responses:
      *       200:
      *         description: Sign out successful
      */
    app.post(ApiUtils.SIGN_OUT, [
        AuthorizationController.signOut,
    ]);
};