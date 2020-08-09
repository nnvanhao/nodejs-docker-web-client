const ApiUtils = require('../common/api/api.router');
const { CommonController } = require('../controllers');

exports.routesConfig = function (app) {
    app.get(ApiUtils.ROOT, [
        CommonController.accessRoot,
    ]);
};