import {resolve} from 'path';
import merge from "webpack-merge";
import webpack from 'webpack';
import EslintFormatter from 'react-dev-utils/eslintFormatter';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

import compose from '@efr/medservice-web-presentation-core/src/utils/compose';
import {paths} from "./build-utils";

const jsPattern = /\.(js|jsx)$/;
const efrExcludePattern = /node_modules(?!(\/|\\)@efr).*/;


export const withLinter = () => config => merge(config, {
    module: {
        rules: [
            {
                test: jsPattern,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: EslintFormatter,
                            baseConfig: {
                                extends: [require.resolve('@efr/medservice-eslint-config-react')],
                            },
                            ignore: false,
                            useEslintrc: false,
                        },
                        loader: 'eslint-loader'
                    },
                ],
                exclude: efrExcludePattern,
            },
        ],
    }
});

export const withBabel = () => config => merge(config, {
    module: {
        rules: [
            {
                test: jsPattern,
                loader: 'babel-loader',
                exclude: efrExcludePattern,
                query: {
                    cacheDirectory: true,
//                plugins: ['transform-runtime']
                },
            }
        ]
    },
});

export const withIndexHtml = (filename = "index.html.tpl") => config => merge(config, {
    plugins: [
        new InterpolateHtmlPlugin(process.env),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(paths.static, "index.html"),
            filename: resolve(paths.build, filename),
        })
    ]
});

export const withImages = () => config => merge(config, {
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader:
                    'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]',
                },
            }
        ]
    },
});

export const withStyles = filename => config => merge(config, {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: !filename
                    ? ['style-loader', 'css-loader']
                    : ExtractTextPlugin.extract({
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                hmr: false,
                            },
                        },
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    minimize: true,
                                },
                            },
                        ]
                    })
            },
        ]
    },
    plugins: [
        filename && new ExtractTextPlugin({
            filename,
        }),
    ].filter(Boolean)
});

export const uglify = () => config => merge(config, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebookincubator/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebookincubator/create-react-app/issues/2488
                ascii_only: true,
            },
            //sourceMap: false,
        }),
    ]
});

export const withAnalyzer = options => config => merge(config, {
    plugins: [
        new BundleAnalyzerPlugin({
            ...options,
            analyzerMode: "static",
            statsFilename: "../bundle-stats.json",
            reportFilename: "../bundle-stats-report.html",
//            generateStatsFile: true,
        })
    ]
});

export {compose};