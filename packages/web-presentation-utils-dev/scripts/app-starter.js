import {existsSync, readdirSync, statSync} from 'fs-extra';
import {config as configureEnv} from 'dotenv';
import express from 'express';
import path, {resolve} from 'path';
import logger from 'morgan';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';
import devMiddleware from 'webpack-dev-middleware';
import {createCompiler, prepareUrls} from 'react-dev-utils/WebpackDevServerUtils';
import openBrowser from 'react-dev-utils/openBrowser';

const configureDBOProxy = app => {
    const {DBO_HOST, DBO_PORT} = process.env;
    if (!DBO_HOST || !DBO_PORT) {
        return;
    }
    app.use("/ib6", proxy({
        target: `http://${DBO_HOST}:${DBO_PORT}`,
    }));
};

const configureApiGatewayProxy = app => {
    const {EFR_BACKEND_HOST, EFR_BACKEND_PORT, EFR_BACKEND_BASE_PATH} = process.env;
    if (!EFR_BACKEND_HOST || !EFR_BACKEND_PORT) {
        return;
    }

    app.use(EFR_BACKEND_BASE_PATH, proxy({
        target: `http://${EFR_BACKEND_HOST}:${EFR_BACKEND_PORT}`,
    }));
};

const configureStaticResources = app => {
    const staticPath = resolve(process.cwd(), 'static-express-files');
    if (!existsSync(staticPath)) {
        return
    }

    readdirSync(staticPath).filter(f => statSync(path.join(staticPath, f)).isDirectory()).forEach(dir => {
        const fsPath = path.join(staticPath, dir);
        const uriPath = `/${dir}`;

        console.log(`[static] ${uriPath} => ${fsPath}`);

        app.post(`${uriPath}*`, (req, res, next) => {
            //Разрешаем делать пост запросы стат файлов
            req.method = "GET";
            next();
        });

        app.use(uriPath, express.static(fsPath))
    });
};

const configureWebpackResources = (app, webpackCfg) => {
    const {EFR_BACKEND_PORT} = process.env;

    const presentationPort = parseInt(EFR_BACKEND_PORT, 10) + 1;

    process.env.EFR_BACKEND_PROTOCOL = "http";
    process.env.EFR_BACKEND_HOST = "localhost";
    process.env.EFR_BACKEND_PORT = presentationPort;

    const urls = prepareUrls("http", "localhost", presentationPort);
    const compiler = createCompiler(
        webpack,
        webpackCfg,
        "presentation app",
        urls,
        false
    );

    const devMiddlewareConfig = {
        hot: false,
        contentBase: webpackCfg.output.path,
        publicPath: webpackCfg.output.publicPath,
        quiet: true,
    };
    app.use((req, res, next) => {
        if (!req.url.startsWith(webpackCfg.output.publicPath)) {
            req.url = webpackCfg.output.publicPath + (req.url === '/' ? "" : req.url);
        }
        next();
    });

    app.use(devMiddleware(compiler, devMiddlewareConfig));
    app.use(`${webpackCfg.output.publicPath}*`, (req, res, next) => compiler.outputFileSystem.readFile(path.join(compiler.outputPath, 'index.html.tpl'), (err, result) => {
            if (err) {
                return next(err);
            }

            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
            return null;
        })
    );
    return {
        url: urls.localUrlForBrowser,
        presentationPort
    }
};

export default webpackCfg => {
    ['.env.local', '.env'].forEach(path => {
        existsSync(path) && configureEnv({path});
    });

    const app = express();

    app.use(logger('dev'));

    configureStaticResources(app);
    configureApiGatewayProxy(app);
    configureDBOProxy(app);

    const {url, presentationPort} = configureWebpackResources(app, webpackCfg);

    const server = app.listen(presentationPort, error => {
        if (error) {
            console.error(error);
            return
        }
        openBrowser(url);
    }).on('error', error => {
        console.error(error);
        server.close()
    });
}