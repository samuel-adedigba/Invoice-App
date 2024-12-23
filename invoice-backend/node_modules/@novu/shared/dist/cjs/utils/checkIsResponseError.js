"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsResponseError = void 0;
const checkIsResponseError = (err) => {
    return !!err && typeof err === 'object' && 'error' in err && 'message' in err && 'statusCode' in err;
};
exports.checkIsResponseError = checkIsResponseError;
