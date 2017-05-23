const webpack = require('webpack');
const minifier = require('babili-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');

const commonConfig = {
    entry: './src/bees.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'bees',
        libraryTarget: 'umd'
    },
    node: {
        process: false
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "sandbox"),
        compress: true,
        port: 9000,
    }
};

const configs = {
    "unmin": {
        output: {
            filename: 'bees.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ]
    },
    "min": {
        output: {
            filename: 'bees.min.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new minifier(),
        ]
    }
};

module.exports = Object.keys(configs).map(key => webpackMerge(commonConfig, configs[key]));