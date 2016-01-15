var path = require('path');
var webpack = require('webpack');

module.exports = function(opts) {
    return {
        devtool: 'eval',
        entry: [
            opts.entry
        ],
        output: {
            path: path.join(__dirname, opts.path),
            filename: 'fullpage.js',
            publicPath: opts.publicPath
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
}