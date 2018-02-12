const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: "./indexOrbit",
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '#balancetonPOC2',
      template: 'indexOrbit.html',
      inject: "head"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});