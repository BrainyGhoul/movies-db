const path = require("path");
const webpack = require("webpack");
const MiniCssExctractPlugin = require("mini-css-extract-plugin");
// const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module: {
        rules:[
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     use: ['source-map-loader'],
            // },
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
                    "css-loader",
                ]
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExctractPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size 
                // NODE_ENV: JSON.stringify("production"),
                NODE_ENV: JSON.stringify("development"),
            },
        }),
        // new SourceMapDevToolPlugin({
        //     filename: "[file].map"
        // }),
    ],
}