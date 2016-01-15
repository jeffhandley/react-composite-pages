var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, '../../../lib/pages'),
    filename: 'counter.js',
    publicPath: '/nui/client/pages'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': true,
      'process.env': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.json/],
      loaders: ['babel'],
      exclude: /node_modules/
    }]
  }
};