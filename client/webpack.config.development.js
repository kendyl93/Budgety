const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { parsed: env } = require('dotenv').config({
  path: path.join(__dirname, '../.client.development.env')
});

module.exports = {
  entry: {
    entry: ['@babel/polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: { compress: true, port: 3000, contentBase: './dist' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      ENVIRONMENT: `<script>window.process = { env: ${JSON.stringify(
        env
      )} };</script>`,
      template: './public/index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
};
