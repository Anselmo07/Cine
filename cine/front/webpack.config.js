import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Usar path.resolve para obtener la ruta correcta
const __dirname = path.resolve();  // Esto da la ruta base del proyecto

// Leer los archivos HTML en el directorio
const htmlFiles = fs.readdirSync(path.resolve(__dirname)).filter(file => file.endsWith('.html'));

export default {
  mode: 'production',
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),  // Cambié a 'public' como en tu configuración original
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
    // Cargar todos los archivos HTML dinámicamente
    ...htmlFiles.map(file => new HtmlWebpackPlugin({
      template: `./${file}`,
      filename: file,
      inject: 'head',  // Inyectar el bundle.js dentro del head
    })),
    new CopyWebpackPlugin({
      patterns: [{ from: 'styles', to: 'styles' }],  // Copiará los estilos a la carpeta 'public/styles'
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL),  // Inyectar la variable de entorno
    }),
  ],
  externals: {
    axios: 'axios',  // Evitar incluir axios en el bundle
  },
};


