const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: path.resolve('client'),
    entry: './index.js',
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
            loader: 'babel-loader'
        }]
    },
    plugins: [HtmlWebpackPluginConfig]
}