const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_MODULE === 'development';

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});
module.exports = {
  entry: [
    './src/js/react.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
              loader: "css-loader",
              options: {
                url: false
              }
          },
          {
              loader: "sass-loader"
          }  
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV
}
