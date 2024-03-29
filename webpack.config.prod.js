const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WEBPACK_Config_Base = require('./webpack.config.base');

const webAppOrSubDirectoryName = 'drink';

module.exports = {
    entry: [
        'babel-polyfill', './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: `/${webAppOrSubDirectoryName}`, // webApp name(if has) on host server
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
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
                            publicPath: `/${webAppOrSubDirectoryName}`
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: './index.html'
    })],
    resolve: WEBPACK_Config_Base.RESOLVE,
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true
                }
            }
        })]
    }

};
