import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';

// Cargar variables del .env
dotenv.config();

// Verificar si la variable se está cargando
console.log("📌 API_URL desde Webpack:", process.env.API_URL);

export default {
  mode: 'production',
  entry: './scripts/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
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
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'head',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'styles', to: 'styles' }],
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL), // Esto inyecta la variable de entorno API_URL
    }),    

  ],
  externals: {
    // Aseguramos que axios no sea incluido en el bundle
    axios: 'axios',
  },
};
