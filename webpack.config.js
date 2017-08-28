const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: path.resolve('client'),
    entry: {
        'index': [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './index.js']
    },
    output: {
        path: __dirname,
        filename: 'bundle.js',
        // publicPath: '/static/'
    },
    devtool: '#eval_source_map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                'presets': ['es2015', 'react'],
                'env': {
                    'development': {
                        'presets': ['react-hmre']
                    }
                }
            }
        }]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}