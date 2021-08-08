const path = require('path');

module.exports = {
    RESOLVE: {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'assets'),
        },
        extensions: ['*', '.js', '.jsx'],
    },
};
