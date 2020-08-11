const RESOURCES = require('../common/constants/baseApiResource.constant');

class ResponseSerializerUtil {
    singleResourceResponse(data, resource) {
        return {
            data: data,
            meta: {
                type: resource,
            }
        }
    }

    collectionResourceResponse(data, resource) {
        const items = this.createListItems(data, resource);

        return {
            items: items,
            meta: {
                type: RESOURCES.COLLECTION,
                count: items.length
            }
        };
    }

    createListItems(data, resource) {
        const items = [];
        data.forEach(function (item) {
            items.push(item);
        });
        return items;
    }

    errorResponse(err) {
        return {
            error: this.getErrorItem(err.resource, err.field, err.code, err.message, err.details),
            meta: this.getErrorItemMeta()
        };
    }

    getErrorItem(resource, field, code, message, details) {
        return {
            resource: resource,
            field: field,
            code: code,
            message: message,
            details: details,
            date: new Date()
        };
    }

    getErrorItemMeta() {
        return {
            type: RESOURCES.ERROR
        };
    }
}

module.exports = new ResponseSerializerUtil();