const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/bees.js',
    output: {
        filename: 'bees.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'bees',
        libraryTarget: 'umd'
    },
    node: {
      process: false
    },
    devtool: 'source-map'
};

module.exports = config;