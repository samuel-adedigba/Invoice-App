export var ApiAuthSchemeEnum;
(function (ApiAuthSchemeEnum) {
    ApiAuthSchemeEnum["BEARER"] = "Bearer";
    ApiAuthSchemeEnum["API_KEY"] = "ApiKey";
})(ApiAuthSchemeEnum || (ApiAuthSchemeEnum = {}));
export var PassportStrategyEnum;
(function (PassportStrategyEnum) {
    PassportStrategyEnum["JWT"] = "jwt";
    PassportStrategyEnum["JWT_CLERK"] = "jwt-clerk";
    PassportStrategyEnum["HEADER_API_KEY"] = "headerapikey";
})(PassportStrategyEnum || (PassportStrategyEnum = {}));
export const NONE_AUTH_SCHEME = 'None';
