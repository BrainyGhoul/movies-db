const path = require("path");
const webpack = require("webpack");
const MiniCssExctractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module: {
        rules:[
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    // MiniCssExctractPlugin.loader,
                    "css-loader",
                ]
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExctractPlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size 
                // NODE_ENV: JSON.stringify("production"),
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
}