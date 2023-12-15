#!/usr/bin/env node
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('babel-register')({
    ignore: /node_modules\/(?!@efr)/,
    presets: ['es2015']
});

const {getWebpackConfig, buildApp} = require('../scripts'); //NOSONAR
const argv = require('yargs').argv; ////NOSONAR

buildApp(getWebpackConfig(argv));