const webpack = require('webpack');
const minifier = require('babili-webpack-plugin');
const path = require('path');

const configs = [
    { 
        target: 'web',
        entry: './src/bees.js',
        output: {
            filename: 'bees.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'bees',
            libraryTarget: 'umd'
        },
        devServer: {
            contentBase: path.join(__dirname, "sandbox"),
            compress: true,
            port: 9000,
        }
    },
    { 
        target: 'node',
        entry: './src/bees.js',
        output: {
            filename: 'bees.node.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'bees',
            libraryTarget: 'commonjs2'
        }
    }
];

module.exports = configs;