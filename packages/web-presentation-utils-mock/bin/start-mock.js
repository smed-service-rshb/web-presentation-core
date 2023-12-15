#!/usr/bin/env node

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs');
const {resolve} = require('path');
const chalk = require('chalk');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const babelRegister = require('babel-register');
const logger = require('morgan'); //NOSONAR

babelRegister({
    ignore: /node_modules\/(?!@efr)/,
    presets: ['es2015']
});
const dotenvFiles = [
    `.env.local`,
    `.env`,
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv').config({
            path: dotenvFile,
        });
    }
});

const mocksConfig = resolve(process.cwd(), 'mocks.config.js');

if (!fs.existsSync(mocksConfig)) {
    console.error(`Не найден файл ${mocksConfig}.`);
    process.exit(1)
}

const routers = {};
const mocksCreator = require(mocksConfig).default();

const defaultBasePath = process.env.EFR_BACKEND_BASE_PATH;

const registerMock = (mock, basePath = defaultBasePath) => {
    if (mock.forEach) {
        mock.forEach(mock => registerMock(mock, basePath));
        return;
    }
    if (!routers[basePath]) {
        routers[basePath] = express.Router();
    }
    mock.DEFAULT(routers[basePath]);
};
const externalMock = config => {
    config({registerMock, externalMock: () => (undefined)})
};
mocksCreator({registerMock, externalMock});

const port = process.env.EFR_BACKEND_PORT;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
Object.keys(routers).forEach(routerBasePath => {
    console.log(`Зарегистрированы заглушки по пути ${routerBasePath}`);
    app.use(routerBasePath, routers[routerBasePath]);
});

const server = app.listen(port, error => {
    if (error) {
        console.error(error);
        return
    }
    console.log(chalk.green(`Стартовала заглушка http://localhost:${port}`));
}).on('error', error => {
    console.log(error);
    server.close()
});
