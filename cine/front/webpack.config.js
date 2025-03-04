const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");

// Buscar todos los archivos HTML en la raíz del proyecto
const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html"));

module.exports = {
    mode: "production",
    entry: "./scripts/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
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
        ...htmlFiles.map(file => new HtmlWebpackPlugin({
            template: `./${file}`,
            filename: file,  // Genera cada HTML en dist/
        })),
        new CopyWebpackPlugin({
            patterns: [{ from: "styles", to: "styles" }] // Copia toda la carpeta styles
        }),
    ],
};


