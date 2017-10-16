const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    favicon: './assets/images/icon.png',
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
        },
        devtool: '#cheap-module-source-map',
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
            },
	    {
		test: /\.tsx?$/, 
		loader: "ts-loader",
		options: {
          	    transpileOnly: true
        	}
	    },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}