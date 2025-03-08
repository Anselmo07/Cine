import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';

dotenv.config();

export default {
  mode: 'production',
  entry: './scripts/index.js',
  output: {
    // Cambiar para que los archivos se guarden en la carpeta public/dist
    path: path.resolve(process.cwd(), 'public/dist'),
    filename: 'bundle.js',  // Esto generará el archivo bundle.js en la carpeta dist
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
      template: './index.html',  // Usará el archivo index.html en el directorio raíz
      filename: 'index.html',    // El archivo generado también se llamará index.html
      inject: 'head',            // Inyectará el script bundle.js dentro del head
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'styles', to: 'styles' }],  // Copiará los estilos a la carpeta dist/styles
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL), // Inyecta la variable de entorno
    }),
  ],
  externals: {
    axios: 'axios', // Esto asegura que axios no se incluya en el bundle
  },
};

