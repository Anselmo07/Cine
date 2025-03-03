const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
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
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        // Solo incluir el plugin en desarrollo
        process.env.NODE_ENV !== 'production' && new Dotenv(),
    ].filter(Boolean),  // Esto elimina el plugin si no está en desarrollo
};


