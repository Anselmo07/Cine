const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Usar path.resolve para obtener la ruta correcta
const htmlFiles = fs.readdirSync(path.resolve(__dirname)).filter(file => file.endsWith('.html'));

module.exports = {
  mode: 'production',
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    ...htmlFiles.map(file => new HtmlWebpackPlugin({
      template: `./${file}`,
      filename: file,
    })),
    new CopyWebpackPlugin({
      patterns: [{ from: 'styles', to: 'styles' }]
    }),
  ],
};




