const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const fs = require("fs");

// Buscar todos los archivos HTML en la raíz del proyecto
const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html"));

module.exports = {
    mode: "production",
    entry: "./scripts/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
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
          template: './index.html',  // ruta de tu archivo index.html
          filename: 'index.html',  // genera el archivo index.html en dist/
        }),
        new HtmlWebpackPlugin({
            template: './About.html', // Ruta del archivo About.html
            filename: 'About.html',   // Generará About.html en dist/
          }),
          new HtmlWebpackPlugin({
            template: './HistoriaCine.html',
            filename: 'HistoriaCine.html',
          }),
          // Agrega más configuraciones similares si tienes otros archivos HTML
          new HtmlWebpackPlugin({
            template: './formulario.html',
            filename: 'formulario.html',
          }),
    ],
};

