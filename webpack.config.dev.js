const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WEBPACK_Config_Base = require('./webpack.config.base');

module.exports = {
    entry: [
        'babel-polyfill', './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }, {
                use: [
                    'style-loader', 'css-loader'
                ],
                test: /\.css$/
            }, {
                test: /\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: WEBPACK_Config_Base.RESOLVE,
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port: 9999,
    }
};
