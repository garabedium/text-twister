const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
          // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          {
              loader: "css-loader"
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
  // Remove comments:
  // optimization: {
  //   minimizer: [
  //     new OptimizeCSSAssetsPlugin({
  //       cssProcessorPluginOptions: {
  //         preset: ['default', { discardComments: { removeAll: true } }],
  //       }
  //     })
  //   ],
  // },  
  plugins: [
    htmlPlugin,
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV
}
