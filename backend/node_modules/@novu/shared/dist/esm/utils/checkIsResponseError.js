export const checkIsResponseError = (err) => {
    return !!err && typeof err === 'object' && 'error' in err && 'message' in err && 'statusCode' in err;
};
