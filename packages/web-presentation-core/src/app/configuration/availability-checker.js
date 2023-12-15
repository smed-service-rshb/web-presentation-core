export default authContext => availability => {
    if (typeof availability === 'boolean') {
        return availability
    }

    if (!authContext) {
        return false
    }

    if (typeof availability === 'function') {
        return !!availability(authContext);
    }

    if (typeof availability === 'string' || availability instanceof String) {
        return authContext.checkPermission(availability);
    }
    return false
}
