const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/drink', // webApp name(if has) on host server
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: './index.html'
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules'
        ],
        extensions: ['*', '.js', '.jsx']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    }
  
};
