const path = require('path');

module.exports = {
    mode: 'development',
    
    entry: "./scripts/index.js",

    output: {
        path: __dirname + "/public",
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Si necesitas transpilar código ES6+
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};