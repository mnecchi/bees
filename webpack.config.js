const webpack = require('webpack');
const minifier = require('babili-webpack-plugin');
const path = require('path');

module.exports =  [
    { 
        target: 'web',
        entry: './src/beesRequest.js',
        output: {
            filename: 'bees-request.js',
            path: path.resolve(__dirname, 'umd'),
            library: 'bees',
            libraryTarget: 'umd'
        },
        externals: {
            "http": 'http',
            "https": 'https',
            "follow-redirects": 'follow-redirects',
        },
        devServer: {
            contentBase: path.join(__dirname, "sandbox"),
            compress: true,
            port: 9000,
        }
    },
    {
        target: 'web',
        entry: './src/beesRequest.js',
        output: {
            filename: 'bees-request.min.js',
            path: path.resolve(__dirname, 'umd'),
            library: 'bees',
            libraryTarget: 'umd'
        },
        externals: {
            "http": 'http',
            "https": 'https',
            "follow-redirects": 'follow-redirects',
        },
        devtool: 'source-map',
        plugins: [
            new minifier(),
        ]
    }
];
