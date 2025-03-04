const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    entry: "./scripts/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "./"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html", // Usa tu index.html existente
            filename: "index.html", // Genera el index.html en public/
        }),
        // Solo incluir el plugin en desarrollo
        process.env.NODE_ENV !== 'production' && new Dotenv(),
    ].filter(Boolean),  // Esto elimina el plugin si no está en desarrollo
};


