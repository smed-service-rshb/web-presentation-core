import queryString from 'query-string'

export default ({protocol, host, port, prefix}) => (url, params) => {
    const urlPath = `${protocol}://${host}:${port}${prefix}${url}`;
    if (!params) {
        return urlPath
    }
    return urlPath + "?" + queryString.stringify(params);
}