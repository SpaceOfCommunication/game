const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getCustomWebpackConfig(config) {
  config.module.rules.unshift({
    test: /\.(mp3)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 10000,
        name: '[name].[hash:7].[ext]',
    },
});
return getWebpackConfig(config);
}
module.exports = getCustomWebpackConfig;