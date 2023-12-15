const responseStatusHandler = code => cb => response => {
    if (response.status === code) {
        return cb(response.response.body)
    }
    throw response
};
responseStatusHandler.badRequest = responseStatusHandler(400);
responseStatusHandler.forbidden = responseStatusHandler(403);
responseStatusHandler.gone = responseStatusHandler(410);
responseStatusHandler.internalServerError = responseStatusHandler(500);
responseStatusHandler.gatewayTimeout = responseStatusHandler(504);

export default responseStatusHandler