import {resolve} from 'path';
import webpack from 'webpack';

import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';

import {paths} from '../scripts/build-utils'
import {
    compose,
    withBabel,
    withImages,
    withIndexHtml,
    withLinter,
    withStyles,
} from "../scripts/webpack-config-support"

const AppConfig = resolve(process.cwd(), 'dev.app.config.js');

module.exports = compose(
    withBabel(),
    withLinter(),
    withIndexHtml(),
    withImages(),
    withStyles(),
)({
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            "babel-polyfill",
            AppConfig,
            resolve(__dirname, '../src/App.jsx'),
        ]
    },
    output: {
        filename: 'js/[name]-bundle.[hash:8].js',
        path: paths.build,
        publicPath: '/',
        libraryTarget: 'var',
        library: 'DevApp',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
        plugins: [
            new ModuleScopePlugin(paths.src),
        ],
        alias: {AppConfig}
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
});
