const hasCloudflareProxyContext = (context) => {
    var _a;
    return !!((_a = context === null || context === void 0 ? void 0 : context.cloudflare) === null || _a === void 0 ? void 0 : _a.env);
};
const hasCloudflareContext = (context) => {
    return !!(context === null || context === void 0 ? void 0 : context.env);
};
export const getEnvVariable = (name, context) => {
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
export const isClerkEnabled = () => (process.env.NOVU_ENTERPRISE === 'true' || process.env.CI_EE_TEST === 'true') && process.env.CLERK_ENABLED === 'true';
