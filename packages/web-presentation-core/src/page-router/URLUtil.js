import pathToRegexp from 'path-to-regexp'
import queryString from 'query-string'
import matchPath from './matchPath'

const buildUrl = (path, params, paramTypes = {}) => {
    const queryParam = {};
    const pathKeys = pathToRegexp(path).keys;

    Object.keys(params).forEach(param => {
        if (param in paramTypes && !pathKeys.some(key => key.name === param)) {
            queryParam[param] = params[param];
        }
    });

    const urlQueryString = queryString.stringify(queryParam);
    const urlPath = pathToRegexp.compile(path)(params);
    if (!urlQueryString) {
        return urlPath
    }
    return urlPath + "?" + urlQueryString;
};

const parseParams = (data, paramsTypes) => {
    if (!paramsTypes) {
        return null;
    }
    const result = {};
    Object.keys(paramsTypes).forEach(key => {
        const paramType = paramsTypes[key];
        if (!paramType){
            return;
        }
        const parse = paramType.parse || (v => v);
        result[key] = parse(data[key]);
    });

    return Object.keys(result).length > 0 ? result : undefined
};

const matchURL = (location, path, paramTypes = {}) => {
    const match = matchPath(location.pathname, {path, exact: true, strict: true});

    if (!match) {
        return null
    }

    const queryParam = queryString.parse(location.search);

    return {params: parseParams({...queryParam, ...match.params}, paramTypes)}
};

export default {
    buildUrl,
    matchURL
}
//TODO покрыть тестами и описать