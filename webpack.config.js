const webpack = require('webpack');
const minifier = require('babili-webpack-plugin');
const path = require('path');

const configs = { 
    target: 'web',
    entry: './src/bees.js',
    output: {
        filename: 'bees.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'bees',
        libraryTarget: 'umd'
    },
    externals: {
        http: 'http',
        https: 'https',
    },
    devServer: {
        contentBase: path.join(__dirname, "sandbox"),
        compress: true,
        port: 9000,
    }
};

module.exports = configs;