export const prepareBooleanStringFeatureFlag = (value, defaultValue) => {
    if (!value) {
        return defaultValue;
    }
    return value === 'true';
};
