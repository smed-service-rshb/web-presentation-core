module.exports = {
    require: [
        'whatwg-fetch',
        'babel-polyfill'
    ],
    components: 'src/**/[A-Z]*.jsx',
    skipComponentsWithoutExample: true,
    webpackConfig: {
        module: {
            loaders: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    loader: 'file-loader'
                }
            ]
        }
    }
};