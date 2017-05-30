const webpack = require('webpack');
const minifier = require('babili-webpack-plugin');
const path = require('path');

module.exports =  [
    { 
        target: 'web',
        entry: './lib/bees.js',
        output: {
            filename: 'bees.js',
            path: path.resolve(__dirname, 'dist'),
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
        entry: './lib/bees.js',
        output: {
            filename: 'bees.min.js',
            path: path.resolve(__dirname, 'dist'),
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
