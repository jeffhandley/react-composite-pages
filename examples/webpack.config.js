var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    ['counter-fluxible']: './pages/counter-fluxible/client.js',
    ['counter-redux']: './pages/counter-redux/client.js',
    ['hello']: './pages/hello/client.js'
  },
  output: {
    path: path.join(__dirname, './lib/client/pages'),
    filename: '[name].js',
    publicPath: '/client/pages'
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