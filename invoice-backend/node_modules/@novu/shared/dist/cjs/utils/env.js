"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClerkEnabled = exports.getEnvVariable = void 0;
const hasCloudflareProxyContext = (context) => {
    var _a;
    return !!((_a = context === null || context === void 0 ? void 0 : context.cloudflare) === null || _a === void 0 ? void 0 : _a.env);
};
const hasCloudflareContext = (context) => {
    return !!(context === null || context === void 0 ? void 0 : context.env);
};
const getEnvVariable = (name, context) => {
    if (typeof process !== 'undefined' && process.env && typeof process.env[name] === 'string') {
        return process.env[name];
    }
    if (hasCloudflareProxyContext(context)) {
        return context.cloudflare.env[name] || '';
    }
    if (hasCloudflareContext(context)) {
        return context.env[name] || '';
    }
    if (context && typeof context[name] === 'string') {
        return context[name];
    }
    try {
        return globalThis[name];
    }
    catch (_) {
    }
    return '';
};
exports.getEnvVariable = getEnvVariable;
const isClerkEnabled = () => (process.env.NOVU_ENTERPRISE === 'true' || process.env.CI_EE_TEST === 'true') && process.env.CLERK_ENABLED === 'true';
exports.isClerkEnabled = isClerkEnabled;
