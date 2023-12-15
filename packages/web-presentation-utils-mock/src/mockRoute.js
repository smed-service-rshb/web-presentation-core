const behaviors = [];
const addBehavior = behavior => {
    behaviors.push(behavior);
};
const withBehaviors = handler => (request, response) => {
    behaviors.forEach(behavior => behavior(request, response));
    handler(request, response);
};

const success = data => (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(data)
};

const plaintext = data => (req, res) => {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    if (typeof data === 'string' || data instanceof String) {
        res.send(data)
    }
    else {
        res.send(JSON.stringify(data));
    }
};
const download = filePath => (req, res) => res.download(filePath);

const error = (code, data) => (req, res) => {
    res.status(code).send(data);
};

const call = method => (path, cb) => {
    const createRoute = handler => router => {
        console.log(`Регистрация обработчика ${method} ${path}`);
        return router[method](path, withBehaviors(handler));
    };

    return {
        DEFAULT: createRoute((request, response) => {
            cb({
                request,
                response,
                success: data => success(data)(request, response),
                plaintext: data => plaintext(data)(request, response),
                download: data => download(data)(request, response),
                error: (code, message) => error(code, message)(request, response)
            })
        }),
        SUCCESS: data => createRoute(success(data)),
        ERROR: (code, message) => createRoute(error(code, message)),
        TIMEOUT: createRoute(() => (null)),
    }
};

export default {
    get: call('get'),
    post: call('post'),
    delete: call('delete'),
    put: call('put'),
}

export {addBehavior};