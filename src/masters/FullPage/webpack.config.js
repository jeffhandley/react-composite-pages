var webpackConfig = require('../../webpackConfig');

module.exports = webpackConfig({
    entry: './client',
    path: '../../../lib/masters',
    publicPath: '/nui/client/masters'
});
