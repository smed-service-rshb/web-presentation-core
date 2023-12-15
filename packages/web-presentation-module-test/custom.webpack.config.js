import webpack from 'webpack';
import config from '@efr/medservice-web-presentation-utils-dev/configs/webpack.config.dev'
import {
    compose,
    withBabel,
    withImages,
    withIndexHtml,
    withLinter,
    withStyles,
    uglify,
    withAnalyzer
} from '@efr/medservice-web-presentation-utils-dev/scripts/webpack-config-support'

module.exports = compose(
    withBabel(),
    withLinter(),
    withIndexHtml(),
    withImages(),
    withStyles("styles.css"),
    uglify(),
    withAnalyzer(),
)({
    ...config,
    module: {},
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
});