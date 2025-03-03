const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './scripts/index.js',  // Ruta de entrada

    output: {
        path: path.resolve(__dirname, 'public'),  // Ruta de salida
        filename: 'bundle.js',  // Nombre del archivo bundle
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // Si necesitas transpilar tu código
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env'),  // Asegúrate de que esta ruta sea correcta
        }),
    ],
};


