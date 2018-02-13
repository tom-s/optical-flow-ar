const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: "./index",
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '#balancetonPOC',
      template: 'index.html',
      inject: "head"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});