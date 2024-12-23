"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareBooleanStringFeatureFlag = void 0;
const prepareBooleanStringFeatureFlag = (value, defaultValue) => {
    if (!value) {
        return defaultValue;
    }
    return value === 'true';
};
exports.prepareBooleanStringFeatureFlag = prepareBooleanStringFeatureFlag;
