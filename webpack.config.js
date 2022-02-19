const path = require('path');
const externals = require('webpack-node-externals');
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    target: "node",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ],
    },
    externals: externals()
};