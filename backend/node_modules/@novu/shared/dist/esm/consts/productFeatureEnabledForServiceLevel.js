import { ApiServiceLevelEnum, ProductFeatureKeyEnum } from '../types';
export const productFeatureEnabledForServiceLevel = Object.freeze({
    [ProductFeatureKeyEnum.TRANSLATIONS]: [ApiServiceLevelEnum.BUSINESS, ApiServiceLevelEnum.ENTERPRISE],
});
