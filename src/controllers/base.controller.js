const ErrorCode = require('../common/constants/errorCode.constant');
const ResponseSerializer = require('../core/responseSerializer');

class BaseController {
    sendResponse(results, resource, httpStatusCode, req, res, next) {
        try {
            const response = this.formatResponse(results, resource);
            res.status(httpStatusCode).send(response);
        } catch (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                next(ErrorCode.SYSTEM_SETTINGS.SYSTEM_SETTINGS_VALIDATION_FAILED);
            } else {
                next(err);
            }
        }
    }

    formatResponse(results, resource) {
        const formattedResponse = Array.isArray(results)
            ? ResponseSerializer.collectionResourceResponse(results, resource)
            : ResponseSerializer.singleResourceResponse(results, resource);
        return formattedResponse;
    }
}

module.exports = BaseController;