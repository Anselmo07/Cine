const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "production",
    entry: "./scripts/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), // Genera la carpeta `dist`
        filename: "bundle.js",
        publicPath: "./", // Importante para que Vercel encuentre los archivos
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
        }),
        process.env.NODE_ENV !== "production" && new Dotenv(),
    ].filter(Boolean),
};


