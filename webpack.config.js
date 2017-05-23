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
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "sandbox"),
        compress: true,
        port: 9000
    }
};

module.exports = config;