const RESOURCES = require('../../common/constants/baseApiResource.constant');

const ERROR_CODE = {
    // System setting error code: 3600 - 3699
    SYSTEM_SETTINGS: {
        SYSTEM_SETTINGS_VALIDATION_FAILED: {
            code: 3600,
            message: 'System setting validation failed',
            field: '',
            resource: RESOURCES.SYSTEM_SETTINGS
        },
    }
}

module.exports = ERROR_CODE;