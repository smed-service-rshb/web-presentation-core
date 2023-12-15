import superagent from 'superagent'
import use from 'superagent-use'
import createBackendUrlBuilder from './createBackendUrlBuilder'

const blankWrapper = arg => arg;

export default backendSettings => {
    const RestClient = use(superagent);
    const buildBackendUrl = createBackendUrlBuilder(backendSettings);
    RestClient.use(request => {
        if (backendSettings.timeout) {
            request.timeout(backendSettings.timeout);
        }
        request.url = buildBackendUrl(request.url);
        return request
    });
    const wrapper = backendSettings.wrapper || blankWrapper;
    return wrapper(RestClient);
}