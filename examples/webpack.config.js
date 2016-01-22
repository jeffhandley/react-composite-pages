var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    ['pages/counter-fluxible']: './pages/counter-fluxible/client.js',
    ['pages/counter-redux']: './pages/counter-redux/client.js',
    ['pages/hello']: './pages/hello/client.js',
    ['templates/components/header']: './templates/components/header/client.js'
  },
  output: {
    path: path.join(__dirname, './lib/client'),
    filename: '[name].js',
    publicPath: '/client'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': true,
      'process.env': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
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